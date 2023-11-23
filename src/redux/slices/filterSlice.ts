import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface FilterState {
  title: string;
  author: string;
  isFaforite: boolean;
}

const initialState: FilterState = {
  title: '',
  author: '',
  isFaforite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setAuthorFilter: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
    toggleFaforite: (state) => {
      state.isFaforite = !state.isFaforite;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

console.log(filterSlice.actions);

console.log(filterSlice.actions.setTitleFilter('test'));

export const { setTitleFilter, resetFilters, setAuthorFilter, toggleFaforite } =
  filterSlice.actions; //это actionCreater, название которого совпатает с ридьюсером

export default filterSlice.reducer; //'это ридьюсер

export const selectTitleFilter = (state: RootState) => state.filter.title;
export const selectAuthorFilter = (state: RootState) => state.filter.author;
export const selectFaforiteFilter = (state: RootState) =>
  state.filter.isFaforite;
