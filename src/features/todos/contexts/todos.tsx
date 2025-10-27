import axios from 'axios';
import React, {
  createContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface State {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type Action =
  | { type: 'getTodos'; payload: Todo[] }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'toggleAll'; payload: boolean }
  | { type: 'updateTodo'; payload: Partial<Todo> & { id: number } }
  | { type: 'removeTodo'; payload: number }
  | { type: 'changeFilter'; payload: 'all' | 'active' | 'completed' }
  | { type: 'setFilter'; payload: 'all' | 'active' | 'completed' };

type AppDispatch = Dispatch<Action>;

export const initialState = {
  todos: [],
  filter: 'all',
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'getTodos': {
      return {
        ...state,
        todos: action.payload,
      };
    }
    case 'addTodo': {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    case 'toggleAll': {
      const updatedTodos = state.todos.map((todo) => ({
        ...todo,
        isCompleted: action.payload,
      }));
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'updateTodo': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, ...action.payload };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'removeTodo': {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'changeFilter': {
      return {
        ...state,
        filter: action.payload,
      };
    }
    default:
      return state;
  }
};

type TodoToCreate = Omit<Todo, 'id'>;

type FieldsToUpdate = Partial<TodoToCreate>;

export const changeFilter = async (
  dispatch: AppDispatch,
  filter: 'all' | 'active' | 'completed'
): Promise<void> => {
  dispatch({
    type: 'changeFilter',
    payload: filter,
  });
};

export const getTodos = async (dispatch: AppDispatch): Promise<void> => {
  const response = await axios.get('http://localhost:3004/todos');
  dispatch({
    type: 'getTodos',
    payload: response.data,
  });
};

export const addTodo = async (
  dispatch: AppDispatch,
  todoToCreate: TodoToCreate
): Promise<void> => {
  const response = await axios.post(
    'http://localhost:3004/todos',
    todoToCreate
  );
  dispatch({
    type: 'addTodo',
    payload: response.data,
  });
};

export const updateTodo = async (
  dispatch: AppDispatch,
  todoId: number,
  fieldsToUpdate: FieldsToUpdate
): Promise<void> => {
  const response = await axios.put(
    `http://localhost:3004/todos/${todoId}`,
    fieldsToUpdate
  );
  dispatch({
    type: 'updateTodo',
    payload: response.data,
  });
};

export const removeTodo = async (
  dispatch: AppDispatch,
  todoId: number
): Promise<void> => {
  await axios.delete(`http://localhost:3004/todos/${todoId}`);
  dispatch({
    type: 'removeTodo',
    payload: todoId,
  });
};

export const toggleAll = async (
  dispatch: AppDispatch,
  isCompleted: boolean,
  todos: Todo[]
): Promise<void> => {
  const promises = todos.map((todo) => {
    return axios.put(`http://localhost:3004/todos/${todo.id}`, {
      text: todo.text,
      isCompleted,
    });
  });
  await Promise.all(promises);
  dispatch({
    type: 'toggleAll',
    payload: isCompleted,
  });
};

interface TodoActions {
  addTodo: (todoToCreate: TodoToCreate) => Promise<void>;
  updateTodo: (todoId: number, fieldsToUpdate: FieldsToUpdate) => Promise<void>;
  removeTodo: (todoId: number) => Promise<void>;
  changeFilter: (filter: 'all' | 'active' | 'completed') => Promise<void>;
  toggleAll: (isCompleted: boolean) => Promise<void>;
}

type TodoContextValue = [State, AppDispatch, TodoActions];

export const TodosContext = createContext<TodoContextValue | undefined>(
  undefined
);

interface TodosProviderProps {
  children: ReactNode;
}

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState as State);
  useEffect(() => {
    getTodos(dispatch);
  }, []);

  return (
    <TodosContext.Provider
      value={[
        state,
        dispatch,
        {
          addTodo: (todoToCreate) => addTodo(dispatch, todoToCreate),
          updateTodo: (todoId, fieldsToUpdate) =>
            updateTodo(dispatch, todoId, fieldsToUpdate),
          removeTodo: (todoId) => removeTodo(dispatch, todoId),
          changeFilter: (filter) => changeFilter(dispatch, filter),
          toggleAll: (isCompleted) =>
            toggleAll(dispatch, isCompleted, state.todos),
        },
      ]}
    >
      {children}
    </TodosContext.Provider>
  );
};
