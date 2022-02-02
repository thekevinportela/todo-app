import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { TodoItem } from '../types';
import useTodoStore from '../stores/todo';
import { Badge, Box, Flex, HStack, Pressable, Spacer, Text } from 'native-base';

type ITodoProps = {
  todo: TodoItem;
};

const Todo: React.FC<ITodoProps> = ({ todo }) => {
  const { title, id } = todo;
  const navigation = useNavigation();
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  return (
    <Box
      width='4/5'
      alignSelf={'center'}
      alignItems='center'
      p='3'
      mb='3'
      rounded='10'
      // borderColor='rgba(120,120,120,0.2)'
      // borderWidth={1}
      // bg={{
      //   linearGradient: {
      //     // colors: ['#325896', '#723E82'],
      //     // colors: ['#5096FE', '#3639A5'],
      //     // colors: ['#A352BB', '#B32970'],
      //     colors: ['rgba(54,59,83,1)', 'rgba(54,59,83,0.2)'],
      //     // colors: ['rgba(24,26,37,0.3)', 'rgba(65,20,92,0.5)'],
      //     start: [0, 0],
      //     end: [1, 0],
      //   },
      // }}
      // style={{ backgroundColor: '#363b53' }}
      style={{ backgroundColor: 'rgba(230,230,230,.2)' }}
    >
      <HStack>
        <Pressable
          onPress={() => {
            navigation.navigate('ToDoDetails', { todo });
            console.log('TODO: ', todo);
          }}
        >
          <Box justifyContent='center' alignItems='center'>
            <Text color='white' fontWeight='normal' fontSize='2xl'>
              {title}
            </Text>
          </Box>
        </Pressable>
        <Pressable
          onPress={() => {
            deleteTodo(id);
          }}
        >
          <Box justifyContent='center' alignItems='center' pt='1'>
            <Feather
              name='trash'
              size={24}
              color='white'
              style={{ paddingLeft: 30 }}
            />
          </Box>
        </Pressable>
      </HStack>
    </Box>

    // <View style={styles.container}>
    //   <TouchableOpacity
    //     onPress={() => {
    //       navigation.navigate('ToDoDetails', { todo });
    //       console.log('TODO: ', todo);
    //     }}
    //   >
    //     <Box
    //       bg={{
    //         linearGradient: {
    //           colors: ['white', 'white'],
    //           start: [0, 0],
    //           end: [1, 0],
    //         },
    //       }}
    //       p='12'
    //       rounded='xl'
    //       _text={{
    //         fontSize: '2xl',
    //         fontWeight: 'medium',
    //         color: 'warmGray.50',
    //         textAlign: 'center',
    //       }}
    //     >
    //       {title}
    //     </Box>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={() => {
    //       deleteTodo(id);
    //     }}
    //   >
    //     <Feather
    //       name='trash'
    //       size={24}
    //       color='black'
    //       style={{ paddingLeft: 30 }}
    //     />
    //   </TouchableOpacity>
    // </View>
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
