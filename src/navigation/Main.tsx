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
import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';

type MainStackParamsList = {
  Home: undefined;
  ToDoDetails: { todo: TodoItem };
};

const Stack = createNativeStackNavigator<MainStackParamsList>();
const Drawer = createDrawerNavigator<MainStackParamsList>();

export type MainStackScreenProps<Screen extends keyof MainStackParamsList> =
  NativeStackScreenProps<MainStackParamsList, Screen>;

export const HomeDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={() => <CustomDrawerContent />}>
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#181A25',
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 5 }}
              onPress={() => navigation.navigate('CreateToDo')}
            >
              <Ionicons name='add' size={34} color='#aaa' />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 5 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <Ionicons name='menu-outline' size={30} color='#aaa' />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeDrawer'
        component={HomeDrawer}
        options={() => ({
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: '#181A25',
          },
        })}
      />

      <Stack.Screen
        name='ToDoDetails'
        component={ToDoDetails}
        options={({ route, navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#181A25',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditToDo', { todo: route.params.todo });
              }}
            >
              <AntDesign name='edit' size={24} color='#aaa' />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name='back' size={24} color='#aaa' />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='CreateToDo'
        component={CreateToDo}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#181A25',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name='back' size={24} color='#aaa' />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='EditToDo'
        component={EditToDo}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#181A25',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name='back' size={24} color='#aaa' />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default Main;
