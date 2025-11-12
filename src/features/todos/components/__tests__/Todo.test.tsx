import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';

import { Todo } from '../Todo';
import {
  customRender,
  mockProviderBasicValue,
  mockBasicTodo,
  mockSetEditingId,
  mockUptdateTodo,
  mockRemoveTodo,
} from '../../../../utils/testUtils';
import userEvent from '@testing-library/user-event';

describe('Todo', () => {
  it('renders default state', () => {
    customRender(
      <Todo
        todo={mockBasicTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />,
      mockProviderBasicValue
    );

    const TodoComponent = screen.getByRole('list');
    const EditComponent = screen.queryByRole('listbox');
    const LabelComponent = screen.getByRole('listitem');

    expect(TodoComponent).not.toHaveClass('completed');
    expect(TodoComponent).not.toHaveClass('editing');
    expect(EditComponent).not.toBeInTheDocument();
    expect(LabelComponent).toHaveTextContent('alpha');
  });

  it('should toggle a todo', async () => {
    const user = userEvent.setup();
    customRender(
      <Todo
        todo={mockBasicTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />,
      mockProviderBasicValue
    );

    const ToggleCheckboxComponent = screen.getByRole('checkbox');
    await user.click(ToggleCheckboxComponent);
    expect(mockUptdateTodo).toHaveBeenCalledWith(mockBasicTodo.id, {
      text: mockBasicTodo.text,
      isCompleted: true,
    });
  });

  it('should remove a todo', async () => {
    const user = userEvent.setup();
    customRender(
      <Todo
        todo={mockBasicTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />,
      mockProviderBasicValue
    );

    const DestroyButtonComponent = screen.getByRole('button');
    await user.click(DestroyButtonComponent);
    expect(mockRemoveTodo).toHaveBeenCalledWith(mockBasicTodo.id);
  });

  it('should activate editing mode', async () => {
    const user = userEvent.setup();
    customRender(
      <Todo
        todo={mockBasicTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />,
      mockProviderBasicValue
    );

    const EditComponent = screen.getByRole('listitem');
    await user.dblClick(EditComponent);
    expect(mockSetEditingId).toHaveBeenCalledWith(mockBasicTodo.id);
  });

  it('should update todo', async () => {
    const user = userEvent.setup();
    customRender(
      <Todo
        todo={mockBasicTodo}
        isEditing={true}
        setEditingId={mockSetEditingId}
      />,
      mockProviderBasicValue
    );

    const EditComponent = screen.getByRole('listbox');
    await user.clear(EditComponent);
    await user.type(EditComponent, 'gama{enter}');
    expect(mockUptdateTodo).toHaveBeenCalledWith(mockBasicTodo.id, {
      text: 'gama',
      isCompleted: false,
    });
  });

  it('should focus on the input after editing activation', async () => {
    customRender(
      <Todo
        todo={mockBasicTodo}
        isEditing={true}
        setEditingId={mockSetEditingId}
      />,
      mockProviderBasicValue
    );

    const EditComponent = screen.getByRole('listbox');
    expect(EditComponent.matches(':focus')).toEqual(true);
  });
});
