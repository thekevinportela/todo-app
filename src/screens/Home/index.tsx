import { FlatList, StyleSheet, Text, View } from 'react-native';
import Todo from '../../components/Todo';
import todoData from '../../assets/todoData';
import useTodoStore from '../../stores/todo';
import useAuthStore from '../../stores/auth';
import { Button } from 'native-base';

const HomeScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  const todos = useTodoStore((state) => state.todos);
  //console.log(todos);
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return <Todo todo={item} />;
        }}
      />
      <Button onPress={() => logout()} mb={'10%'}>
        logout
      </Button>
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
