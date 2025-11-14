import { vi } from 'vitest';
import { type ReactNode } from 'react';
import { render } from '@testing-library/react';

import { TodosContext } from '../features/todos/utils/types/generalTodoTypes';
import type { State } from '../features/todos/utils/types/generalTodoTypes';

export const customRender = (ui: ReactNode, providerProps: any) => {
  return render(
    <TodosContext.Provider value={providerProps}>{ui}</TodosContext.Provider>
  );
};

export const mockBasicTodo = { id: 1, text: 'alpha', isCompleted: false };
export const mockBasicCompletedTodo = {
  id: 1,
  text: 'alpha',
  isCompleted: true,
};
export const multipleTodos = [
  { id: 1, text: 'alpha', isCompleted: false },
  { id: 2, text: 'beta', isCompleted: false },
];

export const mockTodosEmptyState: State = { todos: [], filter: 'all' };
export const mockTodosEmptyStateActive: State = {
  todos: [mockBasicTodo],
  filter: 'active',
};
export const mockBasicCompletedTodoState: State = {
  todos: [mockBasicCompletedTodo],
  filter: 'all',
};
export const mockTodosEmptyStateAll: State = {
  todos: [mockBasicTodo],
  filter: 'all',
};
export const mockTodosWithSomeValuesState: State = {
  todos: [mockBasicTodo],
  filter: 'all',
};
export const mockSeveralTodosWithSomeValuesState: State = {
  todos: multipleTodos,
  filter: 'all',
};

export const mockSetEditingId = vi.fn();
export const mockDispatch = vi.fn();
export const mockAddTodo = vi.fn();
export const mockUptdateTodo = vi.fn();
export const mockRemoveTodo = vi.fn();
export const mockChangeFilterTodo = vi.fn();
export const mockToggleTodo = vi.fn();

export const mockTodoActions = {
  addTodo: mockAddTodo,
  updateTodo: mockUptdateTodo,
  removeTodo: mockRemoveTodo,
  changeFilter: mockChangeFilterTodo,
  toggleAll: mockToggleTodo,
};

export const mockProviderBasicValue = [
  mockTodosWithSomeValuesState,
  mockDispatch,
  mockTodoActions,
];
