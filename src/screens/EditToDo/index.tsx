import { useNavigation } from '@react-navigation/native';
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
    <View style={styles.container}>
      <View style={styles.title}>
        <TextInput
          placeholder='Title'
          placeholderTextColor='#aaa'
          style={styles.titleInput}
          value={title}
          onChangeText={handleTitleChange}
        />
      </View>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSubmit(title, info, id);
          navigation.navigate('Home');
        }}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: { padding: 20, width: '100%' },
  info: {
    paddingHorizontal: 20,
    width: '100%',
    //backgroundColor: 'red',
    height: '60%',
  },
  titleInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 24,
    textAlign: 'center',
  },
  infoInput: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    height: '90%',
    //backgroundColor: 'red',
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
