import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignupScreen from '../screens/Signup';
import LoginScreen from '../screens/Login';

type AuthStackParamsList = {
  Signup: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamsList>();

export type AuthStackScreenProps<Screen extends keyof AuthStackParamsList> =
  NativeStackScreenProps<AuthStackParamsList, Screen>;

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Signup'
        component={SignupScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default Auth;
