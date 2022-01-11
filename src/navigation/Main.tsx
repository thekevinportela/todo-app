import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/Home';
import ToDoDetails from '../screens/ToDoDetails';
import CreateToDo from '../screens/CreateToDo';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import EditToDo from '../screens/EditToDo';
import { TodoItem } from '../types';

type MainStackParamsList = {
  Home: undefined;
  ToDoDetails: { todo: TodoItem };
};

const Stack = createNativeStackNavigator<MainStackParamsList>();

export type MainStackScreenProps<Screen extends keyof MainStackParamsList> =
  NativeStackScreenProps<MainStackParamsList, Screen>;

const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CreateToDo')}>
              <Entypo name='plus' size={24} color='black' />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='ToDoDetails'
        component={ToDoDetails}
        options={({ route, navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditToDo', { todo: route.params.todo });
              }}
            >
              <AntDesign name='edit' size={24} color='black' />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name='CreateToDo' component={CreateToDo} />
      <Stack.Screen name='EditToDo' component={EditToDo} />
    </Stack.Navigator>
  );
};

export default Main;
