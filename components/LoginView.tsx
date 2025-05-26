import React, {useState, useEffect, useCallback} from 'react';
import {
  Platform,
  Linking,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {View, Alert, Image, TextInput, Dimensions} from 'react-native';
import {Button, Text, ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import type {AuthStackScreenProps} from '../../shared/types';
import {
  GOOGLE_CLIENT_ID,
  UNKNOWN_ERROR_TITLE,
  UNKNOWN_ERROR_MESSAGE,
  WHEREABOUT_PRIVACY_POLICY,
} from '../../shared/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
    gap: 14,
    paddingHorizontal: 32,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center' as const,
  },
  text: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold' as const,
    // alignSelf: "center",
  },
});

/**
 * Login/Register screen for Google
 */
// @ts-ignore navigation-typing-missing
const LoginView = ({navigation}: AuthStackScreenProps<'LoginOrRegister'>) => {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const [otherAuthLoading, setOtherAuthLoading] = useState<boolean>(false);

  // Hook for Google sign-in
  // Other services do not need hooks
  useEffect(() => {
    GoogleSignin.configure({webClientId: GOOGLE_CLIENT_ID});
    // Getting the device's height so that I can adjust some of the height of some of the views that are rendered.
    // 812 is the height of the iPhone 13 mini
    const dim = Dimensions.get('screen');
    if (dim.height <= 931) {
      setSmallScreen(true);
    }
  }, []);

  // Render components for login buttons
  const getLoginButtons = () => {
    var buttons = [
      {
        buttonIcon: require('../../media/icons/social-google.png'),
        backgroundColor: '#16181A',
        size: 28,
        padding: 12,
        onPressFunction: handleOnGoogleAuth,
      },
    ];

    const buttonViews = buttons.map((item, index) => {
      return (
        <TouchableOpacity
          key={`auth-button-${index}`}
          onPress={item.onPressFunction}
          style={{marginTop: 60}}>
          <View
            style={{
              paddingVertical: item.padding,
              width: 120,
              backgroundColor: item.backgroundColor,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={item.buttonIcon}
              style={{
                backgroundColor: 'transparent',
                height: item.size,
                width: item.size,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    });
    return buttonViews;
  };

  /**
   * Callback when logging into google
   * @note https://github.com/react-native-google-signin/google-signin
   */
  const handleOnGoogleAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.getTokens();

      if (!idToken) {
        throw new Error('No idToken returned from Google Signin.');
      }

      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
    } catch (error: any) {
      setOtherAuthLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Play services not available.');
      } else {
        console.error('Google Auth error:', error);
        Alert.alert(UNKNOWN_ERROR_TITLE, UNKNOWN_ERROR_MESSAGE);
      }
    }
  };

  const isDisabled = email === '' || password === '' || loading;

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}
        edges={['right', 'bottom', 'left', 'top']}>
        <View style={styles.contentContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 100,
            }}>
            <Text style={styles.text}>Whereabout</Text>
          </View>
          {getLoginButtons()}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginView;
