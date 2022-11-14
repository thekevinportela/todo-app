import { useNavigation } from '@react-navigation/native';
import { Box, Button, Center } from 'native-base';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import uuid from 'react-native-uuid';
import Header from '../../components/Header';
import useTodoStore from '../../stores/todo';

import { TodoItem } from '../../types';

type ITodoProps = {
  todo: TodoItem;
};

const EditToDo = ({ route }) => {
  const { todo } = route.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState(todo.title);
  const [info, setInfo] = useState(todo.info);
  const id = todo.id;
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleInfoChange = (text) => {
    setInfo(text);
  };

  const handleSubmit = (title, info, id) => {
    updateTodo({ title, info, id });
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
          placeholderTextColor='#aaa'
          style={styles.titleInput}
          value={title}
          onChangeText={handleTitleChange}
        />
      </Box>
      <View style={styles.info}>
        <TextInput
          placeholder='Info'
          placeholderTextColor='#aaa'
          multiline
          style={styles.infoInput}
          value={info}
          onChangeText={handleInfoChange}
        />
      </View>
      <Button
        width='4/6'
        p='3'
        mb='3'
        rounded='10'
        bg='#4f46e590'
        onPress={() => handleSubmit(title, info, id)}
      >
        <Text style={{ color: 'white' }}>Submit</Text>
      </Button>
    </Center>
  );
};

export default EditToDo;

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
