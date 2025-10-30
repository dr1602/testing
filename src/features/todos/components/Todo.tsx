import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';

import {
  type IndividualTodoType,
  TodosContext,
} from '../utils/types/generalTodoTypes';

interface TodoProps {
  todo: IndividualTodoType;
  isEditing: boolean;
  setEditingId: (id: number | null) => void;
}

type TodoActions = {
  updateTodo: (id: number, fields: any) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
};
type TodosContextValue = [any, any, TodoActions];

export const Todo: React.FC<TodoProps> = ({
  todo,
  isEditing,
  setEditingId,
}) => {
  const editingClass = isEditing ? 'editing' : '';
  const completedClass = todo.isCompleted ? 'completed' : '';
  const [, , { updateTodo, removeTodo }] = useContext(
    TodosContext
  ) as TodosContextValue;
  const [editText, setEditText] = useState(todo.text);
  const editInputEl = useRef<HTMLInputElement>(null);

  const setTodoInEditingMode = () => {
    setEditingId(todo.id);
  };
  const toggleTodo = () => {
    updateTodo(todo.id, {
      text: todo.text,
      isCompleted: !todo.isCompleted,
    });
  };
  const changeEditInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value);
  };
  const keyDownEditInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateTodo(todo.id, {
        text: event.currentTarget.value,
        isCompleted: todo.isCompleted,
      });
      setEditingId(null);
    }

    if (event.key === 'Escape') {
      setEditText(todo.text);
      setEditingId(null);
    }
  };

  useEffect(() => {
    if (isEditing && editInputEl.current) {
      editInputEl.current.focus();
    }
  });

  return (
    <li
      className={`${editingClass} ${completedClass}`}
      data-testid='todo'
      data-cy='todo'
    >
      <div className='view'>
        <input
          className='toggle'
          data-testid='toggle'
          data-cy='todoCheckbox'
          type='checkbox'
          checked={todo.isCompleted}
          onChange={toggleTodo}
        />
        <label
          onDoubleClick={setTodoInEditingMode}
          data-testid='label'
          data-cy='todoLabel'
        >
          {todo.text}
        </label>
        <button
          className='destroy'
          data-cy='destroy'
          onClick={() => removeTodo(todo.id)}
          data-testid='destroy'
        />
      </div>
      {isEditing && (
        <input
          className='edit'
          data-testid='edit'
          data-cy='todoEdit'
          ref={editInputEl}
          value={editText}
          onChange={changeEditInput}
          onKeyDown={keyDownEditInput}
        />
      )}
    </li>
  );
};
