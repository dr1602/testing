// import { afterAll, beforeAll, afterEach,describe, expect, it, vi } from 'vitest';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
// import { setupServer } from 'msw/node';

import { Tags } from '../Tags';
// import { http, HttpResponse } from 'msw';
import axios from 'axios';

describe('Tags', () => {
  /*
  const server = setupServer(
    http.get('http://localhost:3004/tags', () => {
      return HttpResponse.json([{ id: '1', name: 'bar' }]);
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
*/

  it('should render tags', async () => {
    const mockResponse = {
      data: [{ id: '1', name: 'bar' }],
    };
    vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    render(<Tags />);
    const tags = await screen.findAllByRole('treeitem');
    screen.debug();
    expect(tags).toHaveLength(1);
    // @ts-expect-error El método toHaveTextContent existe en runtime, pero no en el tipo de VS Code.
    expect(tags[0]).toHaveTextContent('bar');
  });

  it('should render many tags', async () => {
    const mockResponse = {
      data: [
        { id: '1', name: 'bar' },
        { id: '2', name: 'dos' },
        { id: '3', name: 'tres' },
      ],
    };
    vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);
    render(<Tags />);
    // colocas el asyn y el await porque tienes que esperar a que la data le llegue al componente
    const tags = await screen.findAllByRole('treeitem');
    expect(tags).toHaveLength(3);
    // @ts-expect-error El método toHaveTextContent existe en runtime, pero no en el tipo de VS Code.
    expect(tags[0]).toHaveTextContent('bar');
    // @ts-expect-error El método toHaveTextContent existe en runtime, pero no en el tipo de VS Code.
    expect(tags[1]).toHaveTextContent('dos');
    // @ts-expect-error El método toHaveTextContent existe en runtime, pero no en el tipo de VS Code.
    expect(tags[2]).toHaveTextContent('tres');
  });
});
