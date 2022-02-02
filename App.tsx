import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation/index';
import { NativeBaseProvider } from 'native-base';

const config = {
  dependencies: {
    // For Expo projects (Bare or managed workflow)
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
    // For non expo projects
    // 'linear-gradient': require('react-native-linear-gradient').default,
  },
};

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <StatusBar style='light' />
      <Navigation />
    </NativeBaseProvider>
  );
}
