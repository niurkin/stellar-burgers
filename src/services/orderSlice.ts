import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { orderBurgerApi } from '../utils/burger-api';
import { TConstructorState } from './constructorSlice';
import { RootState } from './store';

export type TOrderState = {
  loading: boolean;
  order: Array<string>;
  lastOrder: TOrder | null;
};

const initialState: TOrderState = {
  loading: false,
  order: [],
  lastOrder: null
};

export const placeOrder = createAsyncThunk(
  'order/place',
  async (data: Array<string>) => orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Array<string>>) => {
      state.order = action.payload;
    },
    clearOrder(state) {
      state.order = [];
    },
    clearlastOrder(state) {
      state.lastOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.lastOrder = action.payload.order;
        state.loading = false;
        state.order = [];
      })
      .addCase(placeOrder.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const selectCurrentOrder = (state: RootState) =>
  state.currentOrder.order;
export const selectLastOrder = (state: RootState) =>
  state.currentOrder.lastOrder;
export const selectOrderLoading = (state: RootState) =>
  state.currentOrder.loading;

export const { clearOrder, clearlastOrder, setOrder } = orderSlice.actions;
