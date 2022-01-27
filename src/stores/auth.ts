import create, { State } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { setTodosListener } from './todo';

auth().onAuthStateChanged((user) => {
  useAuthStore.getState().checkAuth(user);
  if (user) {
    setTodosListener(user.uid);
  }
});

type UseAuthState = State & {
  isLoggedIn: boolean;
  user: FirebaseAuthTypes.User | undefined; // type this out correctly :)
  initializing: boolean;
  checkAuth: (user: FirebaseAuthTypes.User | null) => void;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const useAuthStore = create<UseAuthState>(
  persist(
    (set, get) => ({
      user: undefined,
      isLoggedIn: false,
      initializing: true,
      checkAuth: (user) => {
        if (user) {
          set({
            user,
            isLoggedIn: true,
            initializing: false,
          });
        } else {
          set({
            isLoggedIn: false,
            initializing: false,
          });
        }
      },
      signup: (email, password) =>
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then((credentials) => {
            get().checkAuth(credentials.user);
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
          .then((credentials) => {
            set({
              isLoggedIn: true,
              user: credentials.user,
            });
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
