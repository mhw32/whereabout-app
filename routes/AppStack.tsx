import React, { useContext, useEffect, useState, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import type { NavigationContainerRef } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "./AuthNavigator";
import { View, Linking } from "react-native";
import { fetchUser } from "../shared/services";
import type { AppStackParamList } from "../shared/types";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// For main stack
const Stack = createNativeStackNavigator<AppStackParamList>();

// For bottom tabs
const Tab = createBottomTabNavigator();

/**
 * AppStack
 * --
 * Main route controller for the application.
 * Contains logic for tab and stack definitions
 */
const AppStack = () => {
  // Fetch user from `AuthContext`
  const { user } = useContext(AuthContext);
  // State variable for whether loading is complete
  const [loading, setLoading] = useState<boolean>(true);
  // State variable for whether user has set a username
  const [_, setHasUsername] = useState<boolean>(false);
  // Reference to navigation flow
  const navigationRef = useRef<NavigationContainerRef<AppStackParamList>>(null);

  // Create any necessary folders and files in the filesystem
  const prepareFilesystem = async () => {
    if (!user) return; // Punt if no user exists
    const userId = user.userId; // Fetch user ID
    // We make a directory to store recordings for the user
    const cache = await getCacheDir(userId);
    try {
      // Create the cache directory
      const exists = await checkIfDirExists(cache);
      if (!exists) {
        await RNFS.mkdir(cache);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnLoad = async () => {
    setLoading(true); // Turn on loading state
    try {
      // Make any needed directories
      await prepareFilesystem();
      // Check if user has a username
      if (user) {
        const myUser = await fetchUser(user.userId);
        // Check if user has set a username
        if (myUser.username) {
          setHasUsername(true);
        }
      }
    } finally {
      setLoading(false); // Turn off loading state
    }
  };

  useEffect(() => {
    handleOnLoad();
    // Setup the handlers to receive notifications
    setupNotificationHandlers();
    if (user) {
      // Update the notification token
      updateNotificationToken(user.userId);
    }
  }, []);

  useEffect(() => {
    // onForegroundEvent is called when the user clicks a notification
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      const { notification } = detail;
      // Do nothing if user dismisses action or notification is missing data
      if (
        notification &&
        notification.data &&
        (type === EventType.PRESS || type === EventType.ACTION_PRESS)
      ) {
        const data: MessageDataType = {
          params: notification.data.params ? `${notification.data.params}` : "",
          name: notification.data.name ? `${notification.data.name}` : "",
          user: notification.data.user
            ? `${notification.data.user}`
            : undefined,
          screen: notification.data.screen
            ? `${notification.data.screen}`
            : undefined,
        };
        const { deepLink, showNotification } = messageDataToDeepLink(
          data,
          user?.userId
        );
        if (deepLink && showNotification) {
          Linking.openURL(deepLink).catch((e) =>
            console.error("Failed to open deep link:", e)
          );
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // onBackgroundEvent is a listener for when a user clicks a notification and
  // the application is in the background
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification } = detail;
    // Do nothing if user dismisses action or notification is missing data
    if (
      notification &&
      notification.data &&
      (type === EventType.PRESS || type === EventType.ACTION_PRESS)
    ) {
      const data: MessageDataType = {
        params: notification.data.params ? `${notification.data.params}` : "",
        name: notification.data.name ? `${notification.data.name}` : "",
        user: notification.data.user ? `${notification.data.user}` : undefined,
        screen: notification.data.screen
          ? `${notification.data.screen}`
          : undefined,
      };
      const { deepLink, showNotification } = messageDataToDeepLink(
        data,
        user?.userId
      );
      if (deepLink && showNotification) {
        Linking.openURL(deepLink).catch((e) =>
          console.error("Failed to open deep link:", e)
        );
      }
    }
    if (notification && notification.id) {
      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
  });

  // Get the tabs to show in bottom of phone
  const MyTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          gestureEnabled: false,
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#78808D",
          tabBarStyle: {
            backgroundColor: "black",
            borderTopColor: "#292929",
            paddingTop: 10,
          },
          tabBarIcon: ({ focused }) => {
            if (route.name === "Feed") {
              if (focused) {
                return <ClipsFilled />;
              } else {
                return <ClipsOutline />;
              }
            } else if (route.name === "Hoopers") {
              if (focused) {
                return <FriendsFilled size={24} />;
              } else {
                return <FriendsOutline />;
              }
            } else if (route.name === "Record") {
              if (focused) {
                return <RecordFilled />;
              } else {
                return <RecordOutline />;
              }
            } else if (route.name === "Games") {
              if (focused) {
                return <GamesFilled />;
              } else {
                return <GamesOutline />;
              }
            } else if (route.name === "Profile") {
              if (focused) {
                return <ProfileFilled />;
              } else {
                return <ProfileOutline />;
              }
            } else {
              return <View />;
            }
          },
        })}
      >
        <Tab.Screen
          name="Feed"
          // @ts-ignore unsure how to annotate this type
          component={FeedView}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
          }}
        />
        <Tab.Screen
          name="Hoopers"
          // @ts-ignore unsure how to annotate this type
          component={HoopersView}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
          }}
        />
        <Tab.Screen
          name="Record"
          // @ts-ignore unsure how to annotate this type
          component={RecordView}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
          }}
        />
        <Tab.Screen
          name="Games"
          // @ts-ignore unsure how to annotate this type
          component={GamesView}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
          }}
          initialParams={{
            newSession: undefined,
            deletedSessionId: undefined,
          }}
        />
        <Tab.Screen
          name="Profile"
          // @ts-ignore unsure how to annotate this type
          component={ProfileView}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
            headerTitle: "Me",
          }}
          initialParams={{
            user: user,
            editedMixtape: undefined,
            deletedMixtapeId: undefined,
            initTab: undefined,
          }}
        />
      </Tab.Navigator>
    );
  };

  const linking = {
    prefixes: [HOOPER_UNIVERSAL_LINK, HOOPER_DEEP_LINK],
    config: {
      screens: {
        SessionV4: {
          path: "session/:sessionId",
          parse: {
            sessionId: (sessionId: string) => `${sessionId}`,
            openComments: (openComments: string) => openComments === "true",
            openHighlightId: (openHighlightId: string) => `${openHighlightId}`,
          },
        },
        PublicProfile: {
          path: "profile/:userId",
          parse: {
            userId: (userId: string) => `${userId}`,
            fromNotification: (fromNotification: string) =>
              fromNotification === "true",
          },
        },
        Tabs: {
          path: "",
          screens: {
            Profile: "myprofile",
            Games: "games",
            Hoopers: {
              path: "hoopers/:groupId",
              parse: {
                groupId: (groupId: string) => `${groupId}`,
              },
            },
          },
        },
      },
    },
  };

  // Decide what content to show
  const getContent = () => {
    if (loading) {
      return (
        <SafeAreaView 
          style={{
            flex: 1, 
            backgroundColor: "black",
            justifyContent: "center", 
            alignItems: "center"
          }}
          edges={['right', 'bottom', 'left']}
        />
      );
    }
    return (
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        fallback={
          <SafeAreaView 
            style={{
              flex: 1, 
              backgroundColor: "black",
              justifyContent: "center", 
              alignItems: "center"
            }}
            edges={['right', 'bottom', 'left']}
          />
        }
        theme={DarkTheme}
      >
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "black" },
            gestureEnabled: false,
          }}
        >
          <Stack.Screen
            name="Router"
            component={RouterView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateVersion"
            component={UpdateVersionView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Outage"
            component={OutageView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmailCollection"
            component={EmailCollectionView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerificationView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DateOfBirthCollection"
            component={DateOfBirthCollectionView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ParentPermissionRequest"
            component={ParentPermissionRequestView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ParentPermissionDenied"
            component={ParentPermissionDeniedView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Username"
            component={UsernameView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Realname"
            component={RealnameView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notifs"
            component={NotifsView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{
              headerShown: false,
              animation: "none", // Disable animation for this screen
            }}
          />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditionsView}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="SessionV2"
            component={SessionViewV2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SessionV3"
            component={SessionViewV3}
            options={{ headerShown: false }}
            initialParams={{
              newTags: undefined,
              newClusters: undefined,
              newShots: undefined,
              newHighlights: undefined,
            }}
          />
          <Stack.Screen
            name="SessionV4"
            component={SessionViewV4}
            options={{ headerShown: false }}
            initialParams={{}}
          />
          <Stack.Screen
            name="PublicProfile"
            component={PublicProfileView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TaggingV3"
            component={TaggingViewV3}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
            initialParams={{
              session: undefined,
              synced: undefined,
              initClusters: [],
              initShots: [],
              initTags: [],
              initTaggedUsers: [],
              initHighlights: [],
            }}
          />
          <Stack.Screen
            name="TaggingV4"
            component={TaggingViewV4}
            options={{
              headerShown: false,
              animation: "none",
            }}
            initialParams={{
              session: undefined,
              synced: undefined,
              initClusters: [],
              initShots: [],
              initTags: [],
              initTaggedUsers: [],
              initHighlights: [],
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsView}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: "black" },
            }}
          />
          <Stack.Screen
            name="SettingsLite"
            component={SettingsLiteView}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: "black" },
            }}
          />
          <Stack.Screen
            name="Recording"
            component={RecordingView}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: "black" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="PreUpload"
            component={PreUploadView}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="Processing"
            component={ProcessingView}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="Errored"
            component={ErroredView}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="Feedback"
            component={FeedbackView}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="Report"
            component={ReportView}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="ReAuth"
            component={ReAuthView}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="MixtapeCreator"
            component={MixtapeCreatorView}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="MixtapeLibrary"
            component={MixtapeLibraryView}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="CreateGroup"
            component={CreateGroupView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Group"
            component={GroupView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GroupMembers"
            component={GroupMembersView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GroupSchedule"
            component={GroupScheduleView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GroupChat"
            component={GroupChatView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GroupGames"
            component={GroupGamesView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GroupHighlights"
            component={GroupHighlightsView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GroupStats"
            component={GroupStatsView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Event"
            component={EventView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateEvent"
            component={CreateEventView}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="EditEvent"
            component={EditEventView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditGroup"
            component={EditGroupView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditSeason"
            component={EditSeasonView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateSeason"
            component={CreateSeasonView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddGamesToGroup"
            component={AddGamesToGroupView}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="ManageMembers"
            component={ManageMembersView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ManageMember"
            component={ManageMemberView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TransferOwnership"
            component={TransferOwnershipView}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return getContent();
};

export default AppStack;
