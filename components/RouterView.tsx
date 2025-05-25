import React, { useState, useEffect, useContext } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../routes/AuthNavigator";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator } from "react-native-paper";
import type { AppStackScreenProps } from "../shared/types";
import { Platform } from "react-native";
import * as RNLocalize from "react-native-localize";
import {
  APPLE_ANDROID_REVIEW_EMAILS,
  PARENT_PERMISSION_STATUS_APPROVED,
  PARENT_PERMISSION_STATUS_DENIED,
} from "../shared/constants";

/**
 * RouterView
 * --
 * Component to route the user to the right screen
 */
const RouterView = ({ navigation }: AppStackScreenProps<"Router">) => {
  // Manages whether to show the "something went wrong" screen or not
  const [timeoutReached, setTimeoutReached] = useState<boolean>(false);
  // Fetch user from the context
  const { user } = useContext(AuthContext);
  if (!user) {
    // Something went wrong so quit out
    auth().signOut();
    return;
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const fetchData = async () => {
      // This is for case where the server is down and there is no network at all
      if (!user.userId) {
        setTimeoutReached(true);
        return;
      }
      // This is the Firebase auth user, which has the emailVerified property
      const authUser = auth().currentUser;
      if (!authUser) {
        // Something went wrong so quit out
        auth().signOut();
        return;
      }
      navigation.navigate("Tabs", { screen: "Profile", params: {} });
    };
    fetchData();
    return () => clearTimeout(timer);
  }, []);

  if (timeoutReached) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
        edges={["right", "bottom", "left"]}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            padding: 20,
          }}
        >
          We encountered an issue. Restart the app or check the device's network
          connection.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
      edges={["right", "bottom", "left"]}
    >
      <ActivityIndicator animating={true} size="large" color="white" />
    </SafeAreaView>
  );
};

export default RouterView;
