import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders dafault error state', () => {
    render(<ErrorMessage />);
    screen.debug();
    // @ts-expect-error El método toHaveTextContent existe en runtime, pero no en el tipo de VS Code.
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
  });

  it('renders custom error state', () => {
    render(<ErrorMessage message='Email is already taken' />);
    // @ts-expect-error El método toHaveTextContent existe en runtime, pero no en el tipo de VS Code.
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Email is already taken'
    );
  });
});
