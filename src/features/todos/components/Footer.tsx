import { useContext, type MouseEvent } from 'react';

import {
  TodosContext,
  type IndividualTodoType,
  type TodosContextValue,
  type State,
} from '../utils/types/generalTodoTypes';

type FilterType = State['filter'];

export const Footer: React.FC = () => {
  const contextValue = useContext(TodosContext);
  if (!TodosContext) {
    throw new Error('Footer proviedr must be used within a TodosProvider');
  }
  const [todosState, , { changeFilter }] = contextValue as TodosContextValue;

  const noTodosClass = todosState.todos.length === 0 ? 'hidden' : '';
  const activeCount = todosState.todos.filter(
    (todo: IndividualTodoType) => !todo.isCompleted
  ).length;
  const itemsLeftText = ` item${activeCount !== 1 ? 's' : ''} left`;
  const getSelectedClass = (filterName: FilterType) => {
    return todosState.filter === filterName ? 'selected' : '';
  };
  const changeActiveFilter = (
    event: MouseEvent<HTMLAnchorElement>,
    filterName: FilterType
  ) => {
    event.preventDefault();
    changeFilter(filterName);
  };

  return (
    <footer className={`footer ${noTodosClass}`} data-testid='footer'>
      <span className='todo-count' data-testid='todoCount' data-cy='todoCount'>
        <strong>{activeCount}</strong>
        {itemsLeftText}
      </span>
      <ul className='filters'>
        <li>
          <a
            href='/'
            data-testid='filterLink'
            data-cy='filterLink'
            className={getSelectedClass('all')}
            onClick={(event) => changeActiveFilter(event, 'all')}
          >
            All
          </a>
        </li>
        <li>
          <a
            href='/'
            data-testid='filterLink'
            data-cy='filterLink'
            className={getSelectedClass('active')}
            onClick={(event) => changeActiveFilter(event, 'active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href='/'
            data-testid='filterLink'
            data-cy='filterLink'
            className={getSelectedClass('completed')}
            onClick={(event) => changeActiveFilter(event, 'completed')}
          >
            Completed
          </a>
        </li>
      </ul>
    </footer>
  );
};
