import React, { useState, useEffect, createContext } from "react";
import auth from "@react-native-firebase/auth";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { StatusBar, View } from "react-native"
import type { User } from "../shared/types";
import { fetchUser, createUser } from "../shared/services";
import { CreateUserRequest } from "../shared/types";
import { SafeAreaView } from "react-native-safe-area-context";

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
}

// Context to store the user
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (user: User) => {},
});

/**
 * Navigation based on user authentication status
 */
const AuthNavigator = () => {  
  const [loading, setLoading] = useState<boolean>(true);
  // Stores the user
  const [user, setUser] = useState<User | null>(null);


  // Callback to handle signin vs registration
  const handleOnAnyAuth = async (userId: string, email: string | null): Promise<User> => {
    let user: User;
    user = await fetchUser(userId);
    if (!user) {
      // Create POST request to create user on backend
      let body: CreateUserRequest = {
        firstName: "",
        lastName: "",
        email: email || "",
        token: "",
      }
      user = await createUser(body);
    }
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
            // backgroundColor: "black",
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
        <View style={{flex:1}}>
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
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <AppStack/>
      </AuthContext.Provider>
    );
  }

  return getContent();
}

export default AuthNavigator;