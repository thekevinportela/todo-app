import create, { State } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoItem } from '../types';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import useAuthStore from './auth';

type UseTodosState = State & {
  todos: TodoItem[];
  addTodo: (todo: TodoItem) => void;
  updateTodo: (todo: TodoItem) => void;
  deleteTodo: (id: string) => void;
  setTodos: (todosFromFirebase: []) => void;
};

const useTodoStore = create<UseTodosState>(
  persist(
    (set, get) => ({
      todos: [],
      setTodos: (todosFromFirebase) => {
        set({
          todos: todosFromFirebase,
        });
      },
      addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
      deleteTodo: (id) => {
        firestore()
          .collection('todos')
          .doc(id)
          .delete()
          .then(() => {
            console.log('User deleted!');
          });
      },

      updateTodo: (todo) => {
        firestore()
          .collection('todos')
          .doc(todo.id)
          .update({
            title: todo.title,
            info: todo.info,
          })
          .then(() => {
            console.log('User updated!');
          });
      },
    }),
    {
      name: 'todo-storage', // unique name
      getStorage: () => AsyncStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export function setTodosListener(uid: string) {
  function onResult(
    QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
  ) {
    const list: any = [];
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
    useTodoStore.getState().setTodos(list);
  }

  function onError(error: Error) {
    console.error(error);
  }

  const unsubscribe = firestore()
    .collection('todos')
    .where('userID', '==', uid)
    .orderBy('postTime')
    .onSnapshot(onResult, onError);
}

export default useTodoStore;
