import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { fetchPosts, setError } from '../../../store/reducers/posts';
import type { RootState, AppDispatch } from '../../../store/reducers';
import type { PostType } from '../types/postsTypes';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Posts = () => {
  const dispatch = useAppDispatch();
  const error: string | null = useAppSelector((state) => state.posts.error);
  const posts: PostType[] = useAppSelector((state) => state.posts.data);
  const isLoading: boolean = useAppSelector((state) => state.posts.isLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <>
      <h1>Posts Page</h1>
      {isLoading && <div data-testid='loading'>Loading</div>}
      {error && (
        <div data-testid='error' role='alert'>
          {error}
        </div>
      )}
      {posts.map((post: PostType) => (
        <div key={post.id} data-testid='post' role='article'>
          {post.name}
        </div>
      ))}
      <button
        data-testid='client-error'
        onClick={() => dispatch(setError('Client error'))}
      >
        Trigger client error
      </button>
    </>
  );
};
