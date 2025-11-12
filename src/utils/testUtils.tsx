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

export const mockTodosEmptyState: State = { todos: [], filter: 'all' };
export const mockTodosEmptyStateActive: State = {
  todos: [{ id: 1, text: 'alpha', isCompleted: false }],
  filter: 'active',
};
export const mockTodosEmptyStateAll: State = {
  todos: [{ id: 1, text: 'alpha', isCompleted: false }],
  filter: 'all',
};
export const mockTodosWithSomeValuesState: State = {
  todos: [{ id: 1, text: 'alpha', isCompleted: false }],
  filter: 'all',
};
export const mockSeveralTodosWithSomeValuesState: State = {
  todos: [
    { id: 1, text: 'alpha', isCompleted: false },
    { id: 2, text: 'beta', isCompleted: false },
  ],
  filter: 'all',
};

export const mockDispatch = vi.fn();
export const mockAddTodo = vi.fn();
export const mockTodoActions = {
  addTodo: mockAddTodo,
  updateTodo: vi.fn(),
  removeTodo: vi.fn(),
  changeFilter: vi.fn(),
  toggleAll: vi.fn(),
};
