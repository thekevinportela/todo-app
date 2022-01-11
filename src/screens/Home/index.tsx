import { FlatList, StyleSheet, Text, View } from 'react-native';
import Todo from '../../components/Todo';
import todoData from '../../assets/todoData';
import useStore from '../../store';

const HomeScreen = () => {
  const todos = useStore((state) => state.todos);
  //console.log(todos);
  return (
    <View style={styles.container}>
      {/* {todos.length > 0 && ( */}
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return <Todo todo={item} />;
        }}
      />
      {/* // )} */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
