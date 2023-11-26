import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createBookWithID } from '../../utilits/createBookWithID';
import { setError } from './errorSlice';
import { RootState } from '../store';
import { IBook } from '../../models/IBooks';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IBookAPI } from '../../models/IBooksAPI';
import { AxiosError } from 'axios';

interface BooksState {
  books: IBook[];
  isLoadingViaAPI: boolean;
}

const initialState: BooksState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url: string, thunkAPI) => {
    try {
      let result = await axios.get<IBookAPI>(url);
      return result.data;
    } catch (error) {
      const e = error as AxiosError;
      thunkAPI.dispatch(setError(e.message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action: PayloadAction<IBook>) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((item) => item.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      for (let item of state.books) {
        if (item.id === action.payload) item.isFaforite = !item.isFaforite;
      }
    },
  },
  extraReducers: {
    [fetchBook.pending.type]: (state) => {
      state.isLoadingViaAPI = true;
    },
    [fetchBook.fulfilled.type]: (state, action: PayloadAction<IBookAPI>) => {
      console.log(action.payload);
      state.isLoadingViaAPI = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, 'API'));
      }
    },
    [fetchBook.rejected.type]: (state) => {
      state.isLoadingViaAPI = false;
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;
export default booksSlice.reducer;
export const selectBook = (state: RootState) => state.books.books;
export const selectIsLoadingViaAPI = (state: RootState) =>
  state.books.isLoadingViaAPI;
