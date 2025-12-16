import { lazy, useState, Suspense } from 'react';

import { Todos } from './features/todos/components/Todos';

const Users = lazy(() => import('./components/requests/Users'));

export const App = () => {
  const [showTodos, setShowTodos] = useState<boolean>(false);

  const handleShowTodos = () => {
    setShowTodos((prev) => !prev);
  };
  return (
    <>
      <button
        onClick={handleShowTodos}
        style={{
          background: 'blue',
          color: 'white',
          padding: 6,
          borderRadius: 6,
          cursor: 'pointer',
          margin: 12,
          marginLeft: 12,
        }}
      >
        Show Todos?
      </button>
      {showTodos && <Todos />}
      <Suspense fallback={<div> Cargando... </div>}>
        <Users />
      </Suspense>
    </>
  );
};
