import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createBookWithID } from '../../utilits/createBookWithID';
import { setError } from './errorSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IBook } from '../../models/IBooks';

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
      let result = await axios.get(url);
      return result.data;
    } catch (error: any) {
      console.log(error);
      thunkAPI.dispatch(setError(error.message)); //?
      //option 1
      // throw error;

      //option 2
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState, //начальное состояние
  reducers: {
    //сюда прописывает ридьюсер, который раньше был c кучей cases в конструкции switch
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((item) => item.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      //   return state.map((item) => {
      //     return action.payload === item.id
      //       ? { ...item, isFavorite: !item.isFaforite }
      //       : item;
      //   });
      for (let item of state.books) {
        if (item.id === action.payload) item.isFaforite = !item.isFaforite;
      }
    },
  },
  extraReducers:
    //option 1
    // (builder) => {

    //   builder.addCase(fetchBook.fulfilled, (state, action) => {
    //     if (action.payload.title && action.payload.author) {
    //       state.books.push(createBookWithID(action.payload, 'API'));
    //     }
    //   });
    //option 2
    {
      [fetchBook.pending.type]: (state) => {
        state.isLoadingViaAPI = true;
      },
      [fetchBook.fulfilled.type]: (state, action) => {
        state.isLoadingViaAPI = false;
        if (action.payload.title && action.payload.author) {
          state.books.push(createBookWithID(action.payload, 'API'));
        }
      },
      [fetchBook.rejected.type]: (state) => {
        state.isLoadingViaAPI = false;
      },
      //---------------------------------------------------
      // builder.addCase(fetchBook.rejected, (state, action) => {
      //   console.log(action);
      // });
    },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions; //это создатели экшенов (типа, actionCreater в ридакс без слайсов)
export default booksSlice.reducer; //это наш ридьюсер, который мы указываем в создатели хранилища createStore()
export const selectBook = (state: RootState) => state.books.books; //это часть объеиденного из всех слайсоов state, на изменения в которой мы подписываемся, через useSelector()
export const selectIsLoadingViaAPI = (state: RootState) =>
  state.books.isLoadingViaAPI;
