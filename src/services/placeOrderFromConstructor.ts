import { createAppAsyncThunk } from './store';
import { placeOrder, selectCurrentOrder } from './orderSlice';
import { resetConstructor } from './constructorSlice';

export const placeOrderFromConstructor = createAppAsyncThunk(
  'order/placeFromConstructor',
  async (_, { dispatch, getState }) => {
    const state = getState();
    const order = selectCurrentOrder(state);

    const result = await dispatch(placeOrder(order)).unwrap();
    dispatch(resetConstructor());
    return result;
  }
);
