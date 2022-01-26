import create, { State } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoItem } from '../types';

type UseTodosState = State & {
  todos: TodoItem[];
  addTodo: (todo: TodoItem) => void;
  updateTodo: (todo: TodoItem) => void;
  deleteTodo: (id: string) => void;
  // setTodos // type me please ;)
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
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
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
    }),
    {
      name: 'todo-storage', // unique name
      getStorage: () => AsyncStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useTodoStore;
