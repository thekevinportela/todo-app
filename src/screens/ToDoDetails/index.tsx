import { StyleSheet, Text, View } from 'react-native';

const ToDoDetails = ({ route }) => {
  const { title, info } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{info}</Text>
    </View>
  );
};

export default ToDoDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 26,
  },
  text: {
    paddingHorizontal: 20,
    fontSize: 18,
  },
});
