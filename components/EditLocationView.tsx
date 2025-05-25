import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * Loading screen with Hooper image
 */
const EditLocationView = ({}) => {
  const getContent = () => {
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

  return getContent();
};

export default EditLocationView;
