import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: string = '';

const errorSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
    clearError: () => {
      return initialState;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;

export const selectErrorMessage = (state: RootState) => state.error;
