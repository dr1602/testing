import { render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { TodosContext } from '../../utils/types/generalTodoTypes';
import { Footer } from '../Footer';
import type { State } from '../../utils/types/generalTodoTypes';
import { customRender } from '../../../../utils/testUtils';

const mockTodosEmptyState: State = { todos: [], filter: 'all' };
const mockTodosEmptyStateActive: State = {
  todos: [{ id: 1, text: 'alpha', isCompleted: false }],
  filter: 'active',
};
const mockTodosEmptyStateAll: State = {
  todos: [{ id: 1, text: 'alpha', isCompleted: false }],
  filter: 'all',
};
const mockTodosWithSomeValuesState: State = {
  todos: [{ id: 1, text: 'alpha', isCompleted: false }],
  filter: 'all',
};
const mockSeveralTodosWithSomeValuesState: State = {
  todos: [
    { id: 1, text: 'alpha', isCompleted: false },
    { id: 2, text: 'beta', isCompleted: false },
  ],
  filter: 'all',
};

const mockDispatch = vi.fn();
const mockAddTodo = vi.fn();
const mockTodoActions = {
  addTodo: mockAddTodo,
  updateTodo: vi.fn(),
  removeTodo: vi.fn(),
  changeFilter: vi.fn(),
  toggleAll: vi.fn(),
};

describe('Footer', () => {
  describe('component visibility', () => {
    it('should be hidden with no todos', () => {
      customRender(<Footer />, [
        mockTodosEmptyState,
        mockDispatch,
        mockTodoActions,
      ]);

      const FooterComponent = screen.getByRole('menubar');
      expect(FooterComponent).toHaveClass('hidden');
    });
  });

  describe('counters', () => {
    it('renders a counter for 1 todo', () => {
      render(
        <TodosContext.Provider
          value={[mockTodosWithSomeValuesState, mockDispatch, mockTodoActions]}
        >
          <Footer />
        </TodosContext.Provider>
      );
      const CounterComponent = screen.getByRole('article');
      expect(CounterComponent).toHaveTextContent('1 item left');
    });

    it('renders a counter for 2 todo', () => {
      render(
        <TodosContext.Provider
          value={[
            mockSeveralTodosWithSomeValuesState,
            mockDispatch,
            mockTodoActions,
          ]}
        >
          <Footer />
        </TodosContext.Provider>
      );
      const CounterComponent = screen.getByRole('article');
      expect(CounterComponent).toHaveTextContent('2 items left');
    });
  });

  describe('filters', () => {
    it('highligths default filter', () => {
      render(
        <TodosContext.Provider
          value={[mockTodosEmptyState, mockDispatch, mockTodoActions]}
        >
          <Footer />
        </TodosContext.Provider>
      );

      const FilteredLinks = screen.getAllByRole('link');
      expect(FilteredLinks[0]).toHaveClass('selected');
    });

    it('highligths changed filter', () => {
      render(
        <TodosContext.Provider
          value={[mockTodosEmptyStateActive, mockDispatch, mockTodoActions]}
        >
          <Footer />
        </TodosContext.Provider>
      );

      const FilteredLinks = screen.getAllByRole('link');
      expect(FilteredLinks[1]).toHaveClass('selected');
    });

    it('changes a filter', async () => {
      const user = userEvent;
      render(
        <TodosContext.Provider
          value={[mockTodosEmptyStateAll, mockDispatch, mockTodoActions]}
        >
          <Footer />
        </TodosContext.Provider>
      );

      const FilteredLinks = screen.getAllByRole('link');
      await user.click(FilteredLinks[1]);
      expect(mockTodoActions.changeFilter).toHaveBeenCalledTimes(1);
      expect(mockTodoActions.changeFilter).toHaveBeenCalledWith('active');
    });
  });
});
