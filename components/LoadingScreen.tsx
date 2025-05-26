import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoadingScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      edges={['right', 'bottom', 'left']}>
      <ActivityIndicator animating={true} size="large" color="white" />
    </SafeAreaView>
  );
};

export default LoadingScreen;
