import { FlatList, StyleSheet, Text, View } from 'react-native';
import Todo from '../../components/Todo';
import useTodoStore from '../../stores/todo';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from 'native-base';

const HomeScreen = () => {
  const todos = useTodoStore((state) => state.todos);

  return (
    <Box
      alignItems='center'
      width='full'
      height='full'
      bg={{
        linearGradient: {
          colors: ['#181A25', '#161F3C', '#41145E'],
          start: [1, 0],
          end: [1.7, 0.6],
        },
      }}
    >
      <Box width='5/6'>
        <FlatList
          data={todos}
          renderItem={({ item }) => {
            return <Todo todo={item} />;
          }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: '5%' }}
        />
      </Box>
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
