import { useContext, useState } from 'react';

import { TodosContext } from '../utils/types/generalTodoTypes';
import { Todo } from '../components/Todo';
import type {
  IndividualTodoType,
  TodosContextValue,
} from '../utils/types/generalTodoTypes';

export const Main = () => {
  const [todosState, , { toggleAll }] = useContext(
    TodosContext
  ) as TodosContextValue;
  const [editingId, setEditingId] = useState<number | null>(null);
  const noTodosClass = todosState.todos.length === 0 ? 'hidden' : '';
  const isAllTodosSelected = todosState.todos.every(
    (todo: IndividualTodoType) => todo.isCompleted
  );
  const getVisibleTodos = () => {
    if (todosState.filter === 'active') {
      return todosState.todos.filter(
        (todo: IndividualTodoType) => !todo.isCompleted
      );
    } else if (todosState.filter === 'completed') {
      return todosState.todos.filter(
        (todo: IndividualTodoType) => todo.isCompleted
      );
    }
    return todosState.todos;
  };
  const visibleTodos = getVisibleTodos();

  return (
    <section className={`main ${noTodosClass}`} data-testid='main'>
      <input
        id='toggle-all'
        className='toggle-all'
        type='checkbox'
        data-testid='toggleAll'
        data-cy='toggleAll'
        checked={isAllTodosSelected}
        onChange={(e) => toggleAll(e.target.checked)}
      />
      <label htmlFor='toggle-all'>Mark all as complete</label>
      <ul className='todo-list'>
        {visibleTodos.map((todo: IndividualTodoType) => (
          <Todo
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            setEditingId={setEditingId}
          />
        ))}
      </ul>
    </section>
  );
};
