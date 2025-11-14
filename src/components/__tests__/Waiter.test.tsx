import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Waiter } from '../Waiter';
import { act } from 'react';

describe('Waiter', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('render current result', async () => {
    render(<Waiter />);

    // act is required because it uses a useEffect
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const WaiterComponent = await screen.getByRole('alert');
    expect(WaiterComponent).toHaveTextContent('passed');
  });
});
