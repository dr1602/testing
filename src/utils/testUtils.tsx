import { type ReactNode } from 'react';
import { render } from '@testing-library/react';

import { TodosContext } from '../features/todos/utils/types/generalTodoTypes';

export const customRender = (ui: ReactNode, providerProps: any) => {
  return render(
    <TodosContext.Provider value={providerProps}>{ui}</TodosContext.Provider>
  );
};
