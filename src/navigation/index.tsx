import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import Auth from './Auth';
import useAuthStore from '../stores/auth';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native';

const Navigation = () => {
  const { isLoggedIn, initializing } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    initializing: state.initializing,
  }));

  if (initializing)
    return (
      <ActivityIndicator
        style={{ flex: 1, alignSelf: 'center' }}
        size={'large'}
      />
    );
  return (
    <NavigationContainer>
      {isLoggedIn ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};

export default Navigation;
