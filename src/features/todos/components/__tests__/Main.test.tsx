import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { TodosContext } from '../../utils/types/generalTodoTypes';
import {
  mockTodosEmptyState,
  mockDispatch,
  mockTodoActions,
  mockTodosEmptyStateAll,
  mockSeveralTodosWithSomeValuesState,
  mockBasicTodo,
  mockBasicCompletedTodoState,
  mockToggleTodo,
} from '../../../../utils/testUtils';
import { Main } from '../Main';
import userEvent from '@testing-library/user-event';

const mockTodo = vi.fn();
vi.mock('./Todo', () => {
  return {
    Todo: (props: any) => {
      mockTodo(props);
      return <div>todo</div>;
    },
  };
});

describe('Main component', () => {
  it('should be hidden when there are no todos', () => {
    render(
      <TodosContext.Provider
        value={[mockTodosEmptyState, mockDispatch, mockTodoActions]}
      >
        <Main />
      </TodosContext.Provider>
    );

    const MainComponent = screen.getByRole('main');
    expect(MainComponent).toHaveClass('hidden');
  });

  it('should be visible when there are todos', () => {
    render(
      <TodosContext.Provider
        value={[mockTodosEmptyStateAll, mockDispatch, mockTodoActions]}
      >
        <Main />
      </TodosContext.Provider>
    );

    screen.debug();
    const MainComponent = screen.getByRole('main');
    expect(MainComponent).not.toHaveClass('hidden');
  });

  it.skip('should render a list of todos', () => {
    render(
      <TodosContext.Provider
        value={[
          mockSeveralTodosWithSomeValuesState,
          mockDispatch,
          mockTodoActions,
        ]}
      >
        <Main />
      </TodosContext.Provider>
    );

    const MainComponent = screen.getByRole('main');
    expect(MainComponent).not.toHaveClass('hidden');
    expect(mockTodo).toHaveBeenCalledTimes(2);
    expect(mockTodo).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        key: 1,
        isEditing: false,
        todo: mockBasicTodo,
        setEditingId: expect.any(Function),
      })
    );
  });

  it('should be visible when there are todos', () => {
    render(
      <TodosContext.Provider
        value={[mockBasicCompletedTodoState, mockDispatch, mockTodoActions]}
      >
        <Main />
      </TodosContext.Provider>
    );

    const ToggleComponent = screen.getAllByRole('checkbox');
    expect(ToggleComponent[0]).toBeChecked();
  });

  it('should toggle all todos', async () => {
    const user = userEvent.setup();
    render(
      <TodosContext.Provider
        value={[mockBasicCompletedTodoState, mockDispatch, mockTodoActions]}
      >
        <Main />
      </TodosContext.Provider>
    );

    const ToggleComponent = screen.getAllByRole('checkbox');
    await user.click(ToggleComponent[0]);
    expect(mockToggleTodo).toHaveBeenCalledWith(false);
  });
});
