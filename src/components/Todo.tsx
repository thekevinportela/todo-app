import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useStore from '../store';
import { TodoItem } from '../types';

type ITodoProps = {
  todo: TodoItem;
};

const Todo: React.FC<ITodoProps> = ({ todo }) => {
  const { title, id } = todo;
  const navigation = useNavigation();
  const deleteTodo = useStore((state) => state.deleteTodo);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ToDoDetails', { todo });
        }}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          deleteTodo(id);
        }}
      >
        <Feather
          name='trash'
          size={24}
          color='black'
          style={{ paddingLeft: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: { padding: 20, flexDirection: 'row' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
