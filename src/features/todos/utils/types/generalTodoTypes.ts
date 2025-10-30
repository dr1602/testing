import { createContext, type Dispatch, type ReactNode } from 'react';

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export interface State {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

export type Action =
  | { type: 'getTodos'; payload: Todo[] }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'toggleAll'; payload: boolean }
  | { type: 'updateTodo'; payload: Partial<Todo> & { id: number } }
  | { type: 'removeTodo'; payload: number }
  | { type: 'changeFilter'; payload: 'all' | 'active' | 'completed' }
  | { type: 'setFilter'; payload: 'all' | 'active' | 'completed' };

export type AppDispatch = Dispatch<Action>;

export type TodoToCreate = Omit<Todo, 'id'>;

export type FieldsToUpdate = Partial<TodoToCreate>;

export interface TodoActions {
  addTodo: (todoToCreate: TodoToCreate) => Promise<void>;
  updateTodo: (todoId: number, fieldsToUpdate: FieldsToUpdate) => Promise<void>;
  removeTodo: (todoId: number) => Promise<void>;
  changeFilter: (filter: 'all' | 'active' | 'completed') => Promise<void>;
  toggleAll: (isCompleted: boolean) => Promise<void>;
}

export type TodoContextValue = [State, AppDispatch, TodoActions];

export const TodosContext = createContext<TodoContextValue | undefined>(
  undefined
);

export interface TodosProviderProps {
  children: ReactNode;
}
