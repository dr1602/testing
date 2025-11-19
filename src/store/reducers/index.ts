import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './posts';

const rootReducer = {
  posts: postsReducer,
};

export const rootReducerConfig = rootReducer;
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
