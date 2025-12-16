import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import { Provider } from 'react-redux';
import { Posts } from '../components/Posts';
import { rootReducerConfig as reducer } from '../../../store/reducers';
import userEvent from '@testing-library/user-event';

const mockTodoAlpah = {
  id: '1',
  name: 'alpha',
};
const mockResponse = {
  data: [mockTodoAlpah],
};
const mockResWithError = { data: [], error: 'Server error', isLoading: false };
const mockErrorObject = {
  payload: 'Client error',
  type: 'posts/setError',
};

describe('Post', () => {
  it('renders posts', async () => {
    const store = configureStore({ reducer });

    vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);
    render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    const postsComponent = await screen.findAllByRole('article');
    screen.debug();
    expect(postsComponent).toHaveLength(1);
    expect(postsComponent[0]).toHaveTextContent('alpha');
  });

  it('renders an error', async () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        posts: mockResWithError,
      },
    });

    vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);
    render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    const AlertComponent = await screen.findByRole('alert');
    expect(AlertComponent).toBeInTheDocument();
    expect(AlertComponent).toHaveTextContent('Server error');
  });

  it('it triggers client error', async () => {
    const user = userEvent.setup();

    const store = configureStore({
      reducer,
    });
    vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Posts />
      </Provider>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    );

    const ButtonComponent = await screen.getByRole('button');
    await user.click(ButtonComponent);
    expect(store.dispatch).toHaveBeenCalledWith(mockErrorObject);
  });
});
