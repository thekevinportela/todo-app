import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import Auth from './Auth';
import useAuthStore from '../stores/auth';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

const Navigation = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    checkAuth(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      {isLoggedIn ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};

export default Navigation;
