import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { Pagination } from '../Pagination';

describe('Pagination', () => {
  it('should render correct pagination', () => {
    render(
      <Pagination total={50} limit={10} currentPage={1} selectPage={() => {}} />
    );

    const pageContainers: HTMLElement[] = screen.getAllByRole('cell');

    screen.debug();
    expect(pageContainers.length).toEqual(5);
    expect(pageContainers).toHaveLength(5);
    // @ts-expect-error El método toHaveTextContent existe en runtime, pero no en el tipo de VS Code.
    expect(pageContainers[0]).toHaveTextContent(1);
  });

  it('should emit clicked page', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Pagination
        total={50}
        limit={10}
        currentPage={1}
        selectPage={handleClick}
      />
    );
    const pageContainers: HTMLElement[] = screen.getAllByRole('cell');
    await user.click(pageContainers[0]);
    expect(handleClick).toHaveBeenCalledOnce();
    expect(handleClick).toHaveBeenCalledWith(1);
  });
});
