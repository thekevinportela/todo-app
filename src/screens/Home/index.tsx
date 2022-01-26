import { FlatList, StyleSheet, Text, View } from 'react-native';
import Todo from '../../components/Todo';
import todoData from '../../assets/todoData';
import useTodoStore from '../../stores/todo';
import useAuthStore from '../../stores/auth';
import { Button } from 'native-base';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const userID = useAuthStore((state) => state.user?.uid);
  useEffect(() => {
    function onResult(
      QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
    ) {
      const list = [];
      QuerySnapshot.forEach((doc) => {
        const { info, postTime, title, userID } = doc.data();
        list.unshift({
          id: doc.id,
          info,
          postTime,
          title,
          userID,
        });
      });
      setTodos(list);
    }

    function onError(error) {
      console.error(error);
    }

    const unsubscribe = firestore()
      .collection('todos')
      .where('userID', '==', userID)
      .onSnapshot(onResult, onError);

    return () => {
      unsubscribe();
    };
  }, []);

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
