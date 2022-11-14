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
      {todos.length !== 0 ? (
        <Box width='full' height='full'>
          <FlatList
            data={todos}
            renderItem={({ item }) => {
              return <Todo todo={item} />;
            }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingTop: '5%' }}
          />
        </Box>
      ) : (
        <Box height='5/6' width='full' justifyContent='center'>
          <Text
            style={{
              color: '#aaa',
              fontSize: 36,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            FIND
          </Text>
          <Text
            style={{
              color: '#aaa',
              fontSize: 36,
              paddingTop: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            SOMETHING
          </Text>
          <Text
            style={{
              color: '#aaa',
              fontSize: 36,
              paddingTop: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            TO DO
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
