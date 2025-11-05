import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Header } from '../Header';
import { TodosContext } from '../../utils/types/generalTodoTypes';
import type { State } from '../../utils/types/generalTodoTypes';
import userEvent from '@testing-library/user-event';

const mockTodosState: State = { todos: [], filter: 'all' };
const mockDispatch = vi.fn();
const mockAddTodo = vi.fn();
const mockTodoActions = {
  addTodo: mockAddTodo,
  updateTodo: vi.fn(),
  removeTodo: vi.fn(),
  changeFilter: vi.fn(),
  toggleAll: vi.fn(),
};

describe('Header', () => {
  it('renders default state', () => {
    render(
      <TodosContext.Provider
        value={[mockTodosState, mockDispatch, mockTodoActions]}
      >
        <Header />
      </TodosContext.Provider>
    );

    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
  });

  it('should add a todo', async () => {
    const user = userEvent.setup();
    render(
      <TodosContext.Provider
        value={[mockTodosState, mockDispatch, mockTodoActions]}
      >
        <Header />
      </TodosContext.Provider>
    );

    const headerInput = screen.getByRole('textbox') as HTMLInputElement;

    await user.type(headerInput, 'alpha{enter}');
    expect(mockAddTodo).toHaveBeenCalledWith({
      text: 'alpha',
      isCompleted: false,
    });
    expect(headerInput.value).toEqual('');
  });
});
