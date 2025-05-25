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
import RouterView from "../components/RouterView";
import ProfileView from "../components/mywhereabouts/ProfileView";
import EditProfileView from "../components/mywhereabouts/EditProfileView";
import LocationView from "../components/LocationView";
import EditLocationView from "../components/EditLocationView";
import EventView from "../components/EventView";
import CreateLocationView from "../components/CreateLocationView";
import FriendsFilled from "../media/icons/FriendsFilled";
import FriendsOutline from "../media/icons/FriendsOutline";
import ProfileFilled from "../media/icons/ProfileFilled";
import ProfileOutline from "../media/icons/ProfileOutline";

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
  // Reference to navigation flow
  const navigationRef = useRef<NavigationContainerRef<AppStackParamList>>(null);

  // Get the tabs to show in bottom of phone
  const MyTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          gestureEnabled: false,
          headerShown: false,
          // tabBarActiveTintColor: "white",
          // tabBarInactiveTintColor: "#78808D",
          tabBarStyle: {
            // backgroundColor: "black",
            borderTopColor: "#292929",
            paddingTop: 10,
          },
          tabBarIcon: ({ focused }) => {
            if (route.name === "My Friends") {
              if (focused) {
                return <FriendsFilled size={24} />;
              } else {
                return <FriendsOutline />;
              }
            } else if (route.name === "My Whereabouts") {
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
          name="MyFriends"
          // @ts-ignore unsure how to annotate this type
          component={MyFriendsView}
          options={{
            headerShown: false,
            // headerStyle: { backgroundColor: "black" },
            // headerTintColor: "#fff",
          }}
        />
        <Tab.Screen
          name="MyWhereabouts"
          // @ts-ignore unsure how to annotate this type
          component={MyWhereaboutsView}
          options={{
            headerShown: false,
            // headerStyle: { backgroundColor: "black" },
            // headerTintColor: "#fff",
          }}
        />
      </Tab.Navigator>
    );
  };

  // Decide what content to show
  const getContent = () => {
    if (loading) {
      return (
        <SafeAreaView 
          style={{
            flex: 1, 
            // backgroundColor: "black",
            justifyContent: "center", 
            alignItems: "center"
          }}
          edges={['right', 'bottom', 'left']}
        />
      );
    }
    return (
      <NavigationContainer
        // linking={linking}
        ref={navigationRef}
        fallback={
          <SafeAreaView 
            style={{
              flex: 1, 
              // backgroundColor: "black",
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
            // headerStyle: { backgroundColor: "black" },
            gestureEnabled: false,
          }}
        >
          <Stack.Screen
            name="Router"
            component={RouterView}
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
            name="Profile"
            component={ProfileView}
            options={{
              headerShown: false,
              // headerStyle: { backgroundColor: "black" },
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileView}
            options={{
              headerShown: false,
              // headerStyle: { backgroundColor: "black" },
            }}
          />
          <Stack.Screen
            name="Location"
            component={LocationView}
            options={{
              headerShown: false,
              // headerStyle: { backgroundColor: "black" },
            }}
          />
          <Stack.Screen
            name="EditLocation"
            component={EditLocationView}
            options={{
              headerShown: false,
              // headerStyle: { backgroundColor: "black" },
            }}
          />
          <Stack.Screen
            name="Event"
            component={EventView}
            options={{
              headerShown: false,
              // headerStyle: { backgroundColor: "black" },
            }}
          />    
          <Stack.Screen
            name="CreateLocation"
            component={CreateLocationView}
            options={{
              headerShown: false,
              // headerStyle: { backgroundColor: "black" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return getContent();
};

export default AppStack;
