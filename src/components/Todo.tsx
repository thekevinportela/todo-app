import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useStore from '../store';

const Todo = ({ title, info, id }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ToDoDetails', { title, info });
          console.log(title, info);
        }}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
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
