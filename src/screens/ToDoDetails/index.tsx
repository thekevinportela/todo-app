import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MainStackScreenProps } from '../../navigation/Main';

type ITodoDetailsProps = MainStackScreenProps<'ToDoDetails'> & {};

const ToDoDetails: React.FC<ITodoDetailsProps> = ({ route, navigation }) => {
  const { todo } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text style={styles.title}>{todo.title}</Text>
        <Text style={styles.text}>{todo.info}</Text>
      </ScrollView>
    </View>
  );
};

export default ToDoDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 26,
    alignSelf: 'center',
  },
  text: {
    paddingHorizontal: 20,
    fontSize: 18,
    alignSelf: 'center',
  },
});
