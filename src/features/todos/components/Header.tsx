import {
  useState,
  useContext,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';

import {
  TodosContext,
  type TodosContextValue,
} from '../utils/types/generalTodoTypes';

export const Header: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [, , { addTodo }] = useContext(TodosContext) as TodosContextValue;

  const changeText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const keydownText = (event: KeyboardEvent<HTMLInputElement>) => {
    const isEnter = event.key === 'Enter';
    const newText = text.trim();
    const isTextPresent = newText.length > 0;

    if (isEnter && isTextPresent) {
      addTodo({ text: newText, isCompleted: false });
      setText('');
    }
  };

  return (
    <header className='header' role='heading'>
      <h1>todos</h1>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        data-testid='newTodoInput'
        role='textbox'
        data-cy='newTodoInput'
        value={text}
        onChange={changeText}
        onKeyDown={keydownText}
        autoFocus
      />
    </header>
  );
};
