import React, { useState, useEffect, createContext } from "react";
import auth from "@react-native-firebase/auth";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { StatusBar, View } from "react-native"
import type { FBUser } from "../shared/types";
import { checkUser, fetchUser, createUser } from "../shared/services";
import { CreateUserRequest } from "../shared/types";
import { USER_TYPE_USER, SUBSCRIPTION_TYPE_BETA } from "../shared/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { setAppContentReady } from '../shared/store';

type AuthContextType = {
  user: FBUser | null;
  setUser: (user: FBUser) => void;
}

// Context to store the user
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (user: FBUser) => {},
});

/**
 * Navigation based on user authentication status
 */
const AuthNavigator = () => {  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  // Stores the user
  const [user, setUser] = useState<FBUser | null>(null);
  // For analytics
  const { track, identify } = useAnalytics();


  // Callback to handle signin vs registration
  const handleOnAnyAuth = async (userId: string, email: string | null): Promise<FBUser> => {
    let user: FBUser;
    // Track user identifying themselves
    await identify(userId, { email: email || undefined });
    // Check if this user is new or now
    const userExists = await checkUser(userId);
    if (userExists) {
      // If it is an existing user, this is just the user signing in
      user = await fetchUser(userId);
    } else {
      // If it is a new user, create one in db
      let notificationToken: string | null;
      try {
        // Fetch notification token
        notificationToken = await getNotificationToken();
      } catch (error) {
        notificationToken = null;
      }
      // Create POST request to create user on backend
      let body: CreateUserRequest = {
        type: USER_TYPE_USER,
        subscriptionType: SUBSCRIPTION_TYPE_BETA,
      }
      if (email) {
        body.email = email;
      }
      if (notificationToken) {
        body.notificationToken = notificationToken;
      }
      user = await createUser(body);
      // Track user registration
      await track("User Registered", { userId: userId });
    }
    // await AsyncStorage.setItem('hasOnboarded', 'true');
    await AsyncStorage.setItem('hasOnboarded', 'false');
    return user;
  }

  // onAuthStateChanged - Handles user state changes
  // @note, `fbUser` and `user` are two distinct objects. The first 
  // is returned it us by firebase (managing state and auth), and the 
  // second is the user object we maintain ourselves in the database 
  const onAuthStateChanged = async (fbUser: any) => {
    try {
      if (fbUser) {
        const user = await handleOnAnyAuth(fbUser.uid, fbUser.email);
        setUser(user);
      } else {
        // Calls this when logging out. Set user to `null`
        setUser(null);
      }
    } catch (error) {
      // Something bad happened - silently fail for now
      console.error(error);
    } finally {
      setLoading(false);
      // Mark content as ready once we know the auth state
      dispatch(setAppContentReady());
    }
  }

  // Hook to authenticate user on mount
  useEffect(() => {
    setLoading(true);

    // Hook for firebase
    auth().onAuthStateChanged(onAuthStateChanged)

  }, []);

  // Pick the content to render
  const getContent = () => {
    // If loading, then show a loading screen
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

    if (!user) {
      // When showing auth content, we can mark it as ready
      return (
        <View style={{flex:1, backgroundColor: "#202429"}}>
          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <AuthStack/>
        </View>
      );
    }

    // Return app content
    return (
      <AuthContext.Provider value={{user, setUser}}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <ActionSheetProvider>
          <HighlightProvider>
            <AppStack/>
          </HighlightProvider>
        </ActionSheetProvider>
      </AuthContext.Provider>
    );
  }

  return getContent();
}

export default AuthNavigator;