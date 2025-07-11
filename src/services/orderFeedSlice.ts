import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { getFeedsApi } from '../utils/burger-api';
import { RootState } from './store';

export type TOrderFeedState = {
    orders: {
        feed: Array<TOrder>;
        loading: boolean;
        total: number;
        totalToday: number;
    };
    userOrders: {
        feed: Array<TOrder>;
        loading: boolean
    };
}

const initialState: TOrderFeedState = {
   orders: {
        feed: [],
        loading: false,
        total: 0,
        totalToday: 0
    },
    userOrders: {
        feed: [],
        loading: false
    }
};

export const getAllOrders = createAsyncThunk(
   "orders/get",
   async () => {
    return getFeedsApi();
   },
);

export const orderFeedSlice = createSlice({
    name: "orderFeed",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.orders.loading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orders.loading = false;
                state.orders.feed = action.payload.orders;
                state.orders.total = action.payload.total;
                state.orders.totalToday = action.payload.totalToday;
            })
            .addCase(getAllOrders.rejected, (state) => {
                state.orders.loading = false;
            });
    }
});

export const selectAllOrders = (state: RootState) => state.orderFeed.orders;
export const selectOrderByNumber = (number: number) => (state: RootState) =>
  state.orderFeed.orders.feed.find(order => order.number === number);