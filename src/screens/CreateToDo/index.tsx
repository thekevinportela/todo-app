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
import useTodoStore from '../../stores/todo';

const CreateToDo = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');

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
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TextInput
          placeholder='Title'
          placeholderTextColor='#aaa'
          style={styles.titleInput}
          onChangeText={handleTitleChange}
        />
      </View>
      <View style={styles.info}>
        <TextInput
          placeholder='Info'
          placeholderTextColor='#aaa'
          multiline
          style={styles.infoInput}
          onChangeText={handleInfoChange}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit(title, info)}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateToDo;

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
