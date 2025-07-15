import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../utils/types';
import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';
import { RootState } from './store';

export type TOrderFeedState = {
  loading: boolean;
  allOrders: TOrdersData;
  userOrders: {
    feed: Array<TOrder>;
  };
};

const initialState: TOrderFeedState = {
  loading: false,
  allOrders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  userOrders: {
    feed: []
  }
};

export const getAllOrders = createAsyncThunk('orders/get', async () =>
  getFeedsApi()
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
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;

        const newOrder = action.payload.orders[0];
        const index = state.allOrders.orders.findIndex(
          (order) => order.number === newOrder.number
        );
        if (index === -1) {
          state.allOrders.orders.push(newOrder);
        } else {
          state.allOrders.orders[index] = newOrder;
        }
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const selectAllOrders = (state: RootState) => state.orderFeed.allOrders;
export const selectOrdersLoading = (state: RootState) =>
  state.orderFeed.loading;
export const selectOrderByNumber = (number: number) => (state: RootState) =>
  state.orderFeed.allOrders.orders.find((order) => order.number === number);
