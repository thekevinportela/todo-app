import create, { State } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoItem } from '../types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type UseAuthState = State & {
  isLoggedIn: boolean;
  user: FirebaseAuthTypes.UserCredential | undefined; // type this out correctly :)
  checkAuth: (user: FirebaseAuthTypes.UserCredential | undefined) => void;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const useAuthStore = create<UseAuthState>(
  persist(
    (set, get) => ({
      user: undefined,
      isLoggedIn: false,
      checkAuth: (user) => {
        if (user) {
          set({
            user,
            isLoggedIn: true,
          });
        } else {
          set({
            isLoggedIn: false,
          });
        }
      },
      signup: (email, password) =>
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            get().checkAuth(user);
            console.log('User account created & signed in!');
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          }),
      login: (email, password) =>
        auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            set({
              isLoggedIn: true,
              user,
            });
            console.log('User successfully logged in!');
          })
          .catch((error) => {
            console.log('ERROR: ', error);
          }),
      logout: () =>
        auth()
          .signOut()
          .then(() => {
            set({
              isLoggedIn: false,
              user: undefined,
            });
          }),
    }),
    {
      name: 'auth-storage', // unique name
      getStorage: () => AsyncStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useAuthStore;
