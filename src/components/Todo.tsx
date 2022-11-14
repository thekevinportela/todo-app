import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { TodoItem } from '../types';
import useTodoStore from '../stores/todo';
import { Badge, Box, Flex, HStack, Pressable, Spacer, Text } from 'native-base';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Entypo } from '@expo/vector-icons';
// import Animated from 'react-native-reanimated';

type ITodoProps = {
  todo: TodoItem;
};

const Todo: React.FC<ITodoProps> = ({ todo }) => {
  const { title, id } = todo;
  const navigation = useNavigation();
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <Swipeable
      renderRightActions={(progress, dragX) => {
        return (
          <SwipeButtons
            progress={progress}
            deleteTodo={() => deleteTodo(id)}
            dragX={dragX}
          />
        );
      }}
    >
      <Box
        width='full'
        // alignSelf={'center'}
        // justifyContent={'center'}
        // alignItems='center'
        p='3'
        mb='3'
        // rounded='10'
        // borderColor='rgba(120,120,120,0.2)'
        // borderWidth={1}
        bg={{
          linearGradient: {
            // colors: ['#325896', '#723E82'],
            // colors: ['indigo.500', 'indigo.800', 'indigo.800'],
            colors: ['#B32970', '#A352BB', '#B3297010'],
            // colors: ['rgba(54,59,83,1)', 'rgba(54,59,83,0.2)'],
            // colors: ['rgba(24,26,37,0.3)', 'rgba(65,20,92,0.5)'],
            start: [0, 0],
            end: [0.4, 3],
          },
        }}
        // style={{ backgroundColor: '#363b53' }}
        // style={{ backgroundColor: 'rgba(230,230,230,.2)' }}
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
                <Entypo name='chevron-right' size={24} color='white' />
                {title}
              </Text>
            </Box>
          </Pressable>
        </HStack>
      </Box>
    </Swipeable>

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

const SwipeButtons = ({
  progress,
  dragX,
  deleteTodo,
}: {
  dragX: Animated.AnimatedInterpolation;
  progress: Animated.AnimatedInterpolation;
  deleteTodo: any;
}) => {
  const scale = progress.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });

  const scale2 = progress.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });

  const opacity2 = progress.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });
  return (
    // <HStack>
    <View style={{ flexDirection: 'row' }}>
      <Animated.View
        style={{
          // height: '100%',
          // flexDirection: 'row',
          opacity: opacity2,
          transform: [{ scale: scale2 }],
        }}
      >
        <Pressable
          // mb={3}
          ml={3}
          px={6}
          height={'5/6'}
          // height={18}
          // width={18}
          rounded='10'
          bg='green.900'
          alignItems='center'
          justifyContent='center'
          onPress={deleteTodo}
        >
          <Box>
            <Feather name='check-square' size={24} color='white' />
          </Box>
        </Pressable>
      </Animated.View>
      <Animated.View
        style={{
          // height: '100%',
          // flexDirection: 'row',
          opacity: opacity,
          transform: [{ scale: scale }],
        }}
      >
        <Pressable
          mb={3}
          ml={3}
          px={6}
          rounded='10'
          bg='red.900'
          height={'5/6'}
          alignItems='center'
          justifyContent='center'
          onPress={deleteTodo}
        >
          <Box>
            <Feather name='trash' size={24} color='white' />
          </Box>
        </Pressable>
      </Animated.View>

      {/* // </HStack> */}
    </View>
  );
};
