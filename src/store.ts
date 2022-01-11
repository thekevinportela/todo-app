import create, { State } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { TodoItem } from './types';

type UseTodosState = State & {
  todos: TodoItem[];
  addTodo: (todo: TodoItem) => void;
  updateTodo: (todo: TodoItem) => void;
  deleteTodo: (id: string) => void;
};

const useStore = create<UseTodosState>((set, get) => ({
  todos: [],
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
}));

export default useStore;
