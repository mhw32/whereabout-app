import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Platform, Linking, Pressable, TouchableOpacity } from "react-native";
import { View, Alert, Image, TextInput, Dimensions } from "react-native";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import auth, { firebase } from "@react-native-firebase/auth";
import type { AuthStackScreenProps } from "../../shared/types";
import { useAnalytics } from "@segment/analytics-react-native";
import { GOOGLE_CLIENT_ID, UNKNOWN_ERROR_TITLE, UNKNOWN_ERROR_MESSAGE, HOOPER_PRIVACY_POLICY } from "../../shared/constants";
import LoadingView from "../shared/LoadingView";

/**
 * Login/Register screen for Google
 */
// @ts-ignore navigation-typing-missing
const LoginOrRegisterView = ({ navigation }: AuthStackScreenProps<"LoginOrRegister">) => {
  // For analytics
  const { screen, track } = useAnalytics();

  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const [otherAuthLoading, setOtherAuthLoading] = useState<boolean>(false);

  // Hook for Google sign-in
  // Other services do not need hooks
  useEffect(() => {
    GoogleSignin.configure({ webClientId: GOOGLE_CLIENT_ID });
    // Getting the device's height so that I can adjust some of the height of some of the views that are rendered.
    // 812 is the height of the iPhone 13 mini
    const dim = Dimensions.get("screen");
    if (dim.height <= 931) {
      setSmallScreen(true);
    }
    // Track user opening the login screen
    screen("Login/Register");
  }, []);

  /** 
   * Callback when logging into google
   * @note https://github.com/react-native-google-signin/google-signin
   */
  const handleOnGoogleAuth = async () => {
    try {
      track("Google Login Clicked");
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      // Sign-in the user with the credential
      await auth().signInWithCredential(credential);
      setOtherAuthLoading(true);
    } catch (error: any) {
      setOtherAuthLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        track("Google Login Cancelled");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        track("Google Login Error - Play Services Not Available");
        // When play services not available
        Alert.alert("Google Play services are currently not available. Please try another platform?");
      } else {  // some other error
        track("Google Login Error");
        Alert.alert(UNKNOWN_ERROR_TITLE, UNKNOWN_ERROR_MESSAGE);
      }
    }
  }

    /**
   * Callback when logging in via email/password
   */
    const handleOnEmailPasswordAuth = async () => {
      setLoading(true);        // Turn on activity indicator
      let loginError = ''
      const trimmedEmail = email.trim();
      try {
        track("EmailPassword Login Clicked");
        // Attempt at creating a new user with the email and password inputs
        await auth().createUserWithEmailAndPassword(trimmedEmail, password);
      } catch (error: any) {
        if (error.code == "auth/email-already-in-use") {
          loginError = 'email_in_use'
        } else {
          // Case when the user has provided a string that's not in a recognizable email format.
          if (error.code == 'auth/invalid-email') {
            track("EmailPassword Login Error - Invalid Email Address");
            Alert.alert('Please enter a valid email address.');
            setLoading(false);
          } else if (error.code == 'auth/weak-password') {
            track("EmailPassword Login Error - Weak password");
            Alert.alert('Please use a stronger password.');
            setLoading(false);
          } else {
            track("EmailPassword Login Error");
            Alert.alert(UNKNOWN_ERROR_TITLE, UNKNOWN_ERROR_MESSAGE);
            setLoading(false);
          }
        }
      }
      // If the email exists.
      if (loginError == 'email_in_use') {
        try {
          // Attempt at logging in with the email and password inputs
          await auth().signInWithEmailAndPassword(trimmedEmail, password);
        } catch (error: any) {
          // Case when the pw is wrong OR they're not using their original sign in method
          if (error.code == "auth/wrong-password") {
            track("EmailPassword Login Error - Wrong Password");
            Alert.alert("Incorrect password or you may want to try the original sign in method.");
            setLoading(false);
          } else {
            track("EmailPassword Login Error");
            Alert.alert(UNKNOWN_ERROR_TITLE, UNKNOWN_ERROR_MESSAGE);
            setLoading(false);
          }
        }
      }
    }

  // Render components for login buttons
  const getLoginButtons = () => {
    var buttons = [
      {
        buttonIcon: require("../../media/icons/social-google.png"),
        backgroundColor: "#16181A",
        size: 28,
        padding: 12,
        onPressFunction: handleOnGoogleAuth
      }
    ];
    }

    const buttonViews = buttons.map((item, index) => {
      return (
        <TouchableOpacity 
          key={`auth-button-${index}`}
          onPress={item.onPressFunction}
        >
          <View 
            style={{
              paddingVertical: item.padding,
              width: 120,
              backgroundColor: item.backgroundColor,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image 
              source={item.buttonIcon} 
              style={{
                backgroundColor: "transparent",
                height: item.size,
                width: item.size,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    });
    return buttonViews;
  }
  
  const isDisabled = email === '' || password === '' || loading;
  
  if (otherAuthLoading) {
    return (
      <LoadingView/>
    )
  } 
  return (
    <SafeAreaView 
      style={{ 
        backgroundColor: "black",
        flex: 1, 
        gap: 14, 
        paddingHorizontal: 32,
      }}
      edges={['right', 'bottom', 'left', 'top']}
    >
      <View 
        style={{
          height: smallScreen ? 80 : 150, 
          paddingHorizontal: 60,
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center",
          marginTop: Platform.OS === 'android' ? 30 : 0
        }}
      >
        <Image 
          style={{ width: "100%", resizeMode: "contain" }} 
          source={require("../../media/logos/hooper-logo-white.png")}
        />
      </View>
      <Text
        variant="bodyMedium"
        style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
      >
        Continue with:
      </Text>
      <View style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
        <TextInput
          style={{
            width: 311,
            height: 48,
            borderWidth: 1,
            borderColor: (error.length > 0) ? "#E52E4D" : "#78808D",
            borderRadius: 5,
            backgroundColor: "#16181A",
            paddingHorizontal: 20,
            fontSize: 18,
            color: "white"
          }}
          placeholder="Email address"
          placeholderTextColor="#78808D"
          inputMode="email"
          onChangeText={email => setEmail(email)}
          value={email}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
        />
        <TextInput
          style={{
            width: 311,
            height: 48,
            borderWidth: 1,
            borderColor: (error.length > 0) ? "#E52E4D" : "#78808D",
            borderRadius: 5,
            backgroundColor: "#16181A",
            paddingHorizontal: 20,
            fontSize: 18,
            color: "white",
          }}
          placeholder="Password"
          placeholderTextColor="#78808D"
          inputMode="text"
          onChangeText={password => setPassword(password)}
          value={password}
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
        />
        <Button 
          mode="contained"
          onPress={handleOnEmailPasswordAuth}
          disabled={isDisabled}
          labelStyle={{ fontSize: 16, fontWeight: "bold" }}
          style={{
            width: 311,
            height: 48,
            backgroundColor: isDisabled ? "#78808D" : "#5040FF",
            paddingVertical: 5,
            borderRadius: 30,
          }}
        >
          {
            loading ? (
              <ActivityIndicator animating={true} color="white" size="small"/>
            ) : (
              <Text style={{ color: isDisabled ? "#abb2bf" : "white", fontWeight: "bold" }}>
                Continue
              </Text>
            )
          }
        </Button>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: 311,
        alignSelf: "center"
      }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#202429' }} />
        <View>
          <Text
            variant="bodyMedium"
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            OR
          </Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: '#202429'}} />
      </View>
      <View 
        style={{ 
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: 311,
          alignSelf: "center"
        }}
      >
        {getLoginButtons()}
      </View>
      <Pressable 
        style={{ 
          alignSelf: 'center',
        }}
        onPress={() => navigation.push('ResetPassword')}
      >
        <Text 
          variant="bodySmall"
          style={{ 
            color: "#ABB2BF", 
            textAlign: "center", 
            textDecorationLine: 'underline',
          }}
        >
          Trouble signing in?
        </Text>
      </Pressable>
      <View
        style={{ 
          alignSelf: "center", 
          width: 176, 
          paddingTop: 200
      }}>
        <Text 
          variant="bodySmall"
          style={{ color: "#808080", textAlign: "center" }}
        >
          By signing up, you agree to our{" "}
            <Text 
              variant="bodySmall"
              style={{ color: "#808080", textAlign: "center", textDecorationLine: 'underline' }}
              onPress={() => {Linking.openURL(HOOPER_PRIVACY_POLICY)}}
            >
              Privacy Policy
            </Text>
          .
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginOrRegisterView;
