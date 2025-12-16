import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UserName } from '../Username';
import userEvent from '@testing-library/user-event';

describe('Username', () => {
  it('should render empty text', () => {
    render(<UserName />);
    // @ts-expect-error El método toHaveTextContent existe en runtime, pero no en el tipo de VS Code.
    expect(screen.getByRole('contentinfo')).toHaveTextContent('');
  });

  it('should render changed username with button', async () => {
    const user = userEvent.setup();
    render(<UserName />);
    await user.click(screen.getByRole('button'));
    // @ts-expect-error El método toHaveTextContent existe en runtime, pero no en el tipo de VS Code.
    expect(screen.getByRole('contentinfo')).toHaveTextContent('bar');
  });

  it('should render changed username with input', async () => {
    const user = userEvent.setup();
    render(<UserName />);
    const userNameInput = screen.getByRole('textbox');
    await user.type(userNameInput, 'foo');
    // @ts-expect-error El método toHaveTextContent existe en runtime, pero no en el tipo de VS Code.
    expect(screen.getByRole('contentinfo')).toHaveTextContent('foo');
  });
});
