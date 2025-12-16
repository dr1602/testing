import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { addTodo, initialState, reducer, TodosProvider } from './todos';
import { useContext, useEffect } from 'react';
import {
  TodosContext,
  type TodoContextValue,
  type State,
  type Action,
} from '../utils/types/generalTodoTypes';
import axios from 'axios';

describe('TodosProvider', () => {
  it('addTodo', async () => {
    const mockResponse = {
      data: { id: '1', text: 'beta', isCompleted: false },
    };

    vi.spyOn(axios, 'post').mockResolvedValue(mockResponse);

    const TestComponent = () => {
      const [todosState, , { addTodo }] = useContext(
        TodosContext
      ) as TodoContextValue;

      useEffect(() => {
        addTodo({ text: 'beta', isCompleted: false });
      }, [addTodo]);

      return <div data-testid='contextContent'>{todosState.todos.length}</div>;
    };

    render(
      <TodosProvider>
        <TestComponent />
      </TodosProvider>
    );

    const content = await screen.findByTestId('contextContent');
    expect(content).toHaveTextContent('1');
  });
});

describe('TodosContext reducer', () => {
  it('has correct default state', () => {
    const unknownObject = { type: 'unknown' };
    const unknownAction = unknownObject as unknown as Action;
    const newState = reducer(initialState as State, unknownAction);

    expect(newState).toEqual({ filter: 'all', todos: [] });
  });

  it('addTodo', () => {
    const newState = reducer(initialState as State, {
      type: 'addTodo',
      payload: { id: 1, text: 'alpha', isCompleted: false },
    });

    expect(newState.todos[0]).toEqual({
      id: 1,
      text: 'alpha',
      isCompleted: false,
    });
  });

  it('toggleAll', () => {
    const oldState = {
      ...initialState,
      todos: [{ id: 1, text: 'alpha', isCompleted: false }],
    };
    const newState = reducer(oldState as State, {
      type: 'toggleAll',
      payload: true,
    });

    expect(newState.todos[0].isCompleted).toEqual(true);
  });

  it('updateTodo', () => {
    const oldState = {
      ...initialState,
      todos: [{ id: 1, text: 'alpha', isCompleted: false }],
    };
    const newState = reducer(oldState as State, {
      type: 'updateTodo',
      payload: { id: 1, text: 'omega' },
    });

    expect(newState.todos[0].text).toEqual('omega');
  });

  it('removeTodo', () => {
    const oldState = {
      ...initialState,
      todos: [{ id: 1, text: 'alpha', isCompleted: false }],
    };
    const newState = reducer(oldState as State, {
      type: 'removeTodo',
      payload: 1,
    });

    expect(newState.todos).toHaveLength(0);
  });

  it('changeFilter', () => {
    const newState = reducer(initialState as State, {
      type: 'changeFilter',
      payload: 'active',
    });

    expect(newState.filter).toEqual('active');
  });
});

describe('api', () => {
  // mockeamos el dispatch
  const mockDispatch = vi.fn();

  it('addTodo', async () => {
    // Mockeamos la respuesta
    const mockResponse = {
      data: { id: 1, text: 'alpha', isCompleted: false },
    };
    // intercepetamos la api
    vi.spyOn(axios, 'post').mockResolvedValue(mockResponse);
    await addTodo(mockDispatch, { text: 'alpha', isCompleted: false });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'addTodo',
      payload: mockResponse.data,
    });
  });
});
