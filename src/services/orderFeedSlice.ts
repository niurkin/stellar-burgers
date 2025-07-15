import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../utils/types';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi
} from '../utils/burger-api';
import { RootState } from './store';

export type TOrderFeedState = {
  loading: boolean;
  allOrders: TOrdersData;
  userOrders: Array<TOrder>;
  orderPreview: TOrder | null;
};

const initialState: TOrderFeedState = {
  loading: false,
  allOrders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  userOrders: [],
  orderPreview: null
};

export const getAllOrders = createAsyncThunk('orders/get', async () =>
  getFeedsApi()
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async () => getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders.orders = action.payload.orders;
        state.allOrders.total = action.payload.total;
        state.allOrders.totalToday = action.payload.totalToday;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.orderPreview = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderPreview = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.loading = false;
        state.orderPreview = null;
      });
  }
});

export const selectAllOrders = (state: RootState) => state.orderFeed.allOrders;
export const selectOrdersLoading = (state: RootState) =>
  state.orderFeed.loading;
export const selectOrderPreview = (state: RootState) =>
  state.orderFeed.orderPreview;
export const selectUserOrders = (state: RootState) =>
  state.orderFeed.userOrders;
