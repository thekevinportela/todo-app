import create, { State } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { TodoItem } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseTodosState = State & {
  todos: TodoItem[];
  fetch: any;
  addTodo: (todo: TodoItem) => void;
  updateTodo: (todo: TodoItem) => void;
  deleteTodo: (id: string) => void;
};

const useStore2 = create<UseTodosState>(
  subscribeWithSelector((set, get) => ({
    todos: [],
    fetch: async () => {
      const response = await AsyncStorage.getItem('@todo_state');
      set({ todos: !response ? [] : JSON.parse(response) });
    },
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    deleteTodo: (id) =>
      set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
    updateTodo: (todo) =>
      set((state) => ({
        todos: state.todos.map((item) => {
          if (item.id === todo.id) {
            return {
              ...item,
              title: todo.title,
              info: todo.info,
            };
          } else {
            return item;
          }
        }),
      })),
  }))
);

useStore.getState().fetch();

const storeData = async (value: UseTodosState) => {
  try {
    const todoState = JSON.stringify(value.todos);
    await AsyncStorage.setItem('@todo_state', todoState);
    console.log(todoState);
  } catch (e) {
    console.log('saving error', e);
  }
};

useStore.subscribe(storeData);

//useStore.subscribe((state) => state.todos, storeData);

export default useStore2;
