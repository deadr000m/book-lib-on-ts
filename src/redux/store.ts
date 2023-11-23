import { configureStore } from '@reduxjs/toolkit';
// import booksReducer from './books/reducer';
import filterReducer from './slices/filterSlice';
import booksReducer from './slices/booksSlice';
import errorReducer from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    //тут будет объект, содержащий ридьюсеры
    books: booksReducer,
    filter: filterReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
