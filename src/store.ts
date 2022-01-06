import create from 'zustand';
import ToDoDetails from './screens/ToDoDetails';

const useStore = create((set) => ({
  todos: [],
  addTodo: (title, id, info) =>
    set((state) => ({ todos: [...state.todos, { title, id, info }] })),
  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}));

export default useStore;
