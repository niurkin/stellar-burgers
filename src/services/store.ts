import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredientsSlice';
import { constructorSlice } from './constructorSlice';
import { orderFeedSlice } from './orderFeedSlice';
import { errorLogMiddleware } from './errorLogMiddleware';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices(ingredientsSlice, constructorSlice, orderFeedSlice);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorLogMiddleware)
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
