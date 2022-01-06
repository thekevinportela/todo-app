import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/Home';
import ToDoDetails from '../screens/ToDoDetails';
import CreateToDo from '../screens/CreateToDo';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Main = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CreateToDo')}>
              <Entypo name='plus' size={24} color='black' />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name='ToDoDetails' component={ToDoDetails} />
      <Stack.Screen name='CreateToDo' component={CreateToDo} />
    </Stack.Navigator>
  );
};

export default Main;
