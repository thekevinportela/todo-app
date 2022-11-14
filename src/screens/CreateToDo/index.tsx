import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import useTodoStore from '../../stores/todo';
import useAuthStore from '../../stores/auth';
import { Box, Button, Center } from 'native-base';

const CreateToDo = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const userID = useAuthStore((state) => state.user?.uid);

  const submitPost = async () => {
    try {
      firestore()
        .collection('todos')
        .add({
          userID,
          title,
          info,
          postTime: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log('Todo Added!');
        })
        .catch((err) => {
          console.log(
            'Something went wrong with added todo to firestore.',
            err
          );
        });
    } catch (error) {
      console.log('ERROR SUBMITTING POST', error);
    }
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleInfoChange = (text) => {
    setInfo(text);
  };

  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (title, info) => {
    const id = uuid.v4();
    addTodo({ title, id, info });
    submitPost();
    navigation.navigate('Home');
  };

  return (
    <Center
      height='full'
      width='full'
      paddingBottom='8'
      bg={{
        linearGradient: {
          colors: ['#181A25', '#161F3C', '#41145E'],
          start: [1, 0],
          end: [1.7, 0.6],
        },
      }}
    >
      <Box paddingX='4' width='full'>
        <TextInput
          placeholder='Title'
          placeholderTextColor='#ffffff90'
          style={styles.titleInput}
          onChangeText={handleTitleChange}
        />
      </Box>
      <Box width='full' paddingX='4' height='2/3'>
        <TextInput
          placeholder='Info'
          placeholderTextColor='#ffffff90'
          multiline
          style={styles.infoInput}
          onChangeText={handleInfoChange}
        />
      </Box>
      <Button
        width='4/6'
        p='3'
        mb='3'
        rounded='10'
        bg='#4f46e590'
        onPress={() => handleSubmit(title, info)}
      >
        <Text style={{ color: 'white' }}>Submit</Text>
      </Button>
    </Center>
  );
};

export default CreateToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: { width: '100%' },
  info: {
    paddingHorizontal: 20,
    width: '100%',
    //backgroundColor: 'red',
    height: '60%',
  },
  titleInput: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    fontSize: 28,
    textAlign: 'center',
    backgroundColor: '#dddddd20',
    color: 'white',
  },
  infoInput: {
    margin: 12,
    padding: 15,
    borderRadius: 5,
    fontSize: 20,
    height: '90%',
    backgroundColor: '#dddddd20',
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#24a0ed',
    width: '70%',
    height: '5%',
  },
});
