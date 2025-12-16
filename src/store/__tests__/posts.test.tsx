import { describe } from 'vitest';
import {
  fetchPosts,
  initialState,
  postsReducer,
  setError,
} from '../reducers/posts';

const mockDefaultInitialState = {
  data: [],
  isLoading: false,
  error: null,
};

const mockErrorState = {
  data: [],
  isLoading: false,
  error: 'Client Error',
};

const mockPendingState = {
  data: [],
  isLoading: true,
  error: null,
};

const mockSuccessState = {
  data: [{ id: '1', name: 'alpha' }],
  isLoading: false,
  error: null,
};

describe('posts', () => {
  it('should have correct initial state', () => {
    const newState = postsReducer(initialState, { type: 'unknown' });
    expect(newState).toEqual(mockDefaultInitialState);
  });

  it('should handle setError', () => {
    const newState = postsReducer(initialState, setError('Client Error'));
    expect(newState).toEqual(mockErrorState);
  });

  it('should handle fetchPost start', () => {
    const newState = postsReducer(initialState, {
      type: fetchPosts.pending.type,
    });
    expect(newState).toEqual(mockPendingState);
  });

  it('should handle fetchPost success', () => {
    const newState = postsReducer(initialState, {
      type: fetchPosts.fulfilled.type,
      payload: [{ id: '1', name: 'alpha' }],
    });
    expect(newState).toEqual(mockSuccessState);
  });
});
