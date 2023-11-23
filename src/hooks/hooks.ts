import type { RootState } from '../redux/store';
import type { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

export let useAppDispatch: () => AppDispatch;
useAppDispatch = useDispatch;
export let useAppSelector: TypedUseSelectorHook<RootState>;
useAppSelector = useSelector;
