import { TodosProvider } from '../contexts/todos';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';

import '../css/todo-mvc-base.css';
import '../css/todo-mvc-app.css';

export const Todos: React.FC = () => {
  return (
    <TodosProvider>
      <div className='todoapp'>
        <Header />
        <Main />
        <Footer />
      </div>
    </TodosProvider>
  );
};
