import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../shared/types';
import LoginView from '../components/auth/LoginView';

/**
 * This is purposefully outside of `AuthStack`
 * @note see https://reactnavigation.org/docs/stack-navigator/
 */
const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * AuthStack
 * --
 * Route controller for the authentication flow.
 * @note The app starts with the top-most screen
 */
const AuthStack = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={LoginView}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
