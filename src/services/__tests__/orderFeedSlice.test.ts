import orderFeedReducer, {
  getAllOrders,
  getUserOrders,
  getOrderByNumber,
  TOrderFeedState
} from '../orderFeedSlice';
import { TOrder } from '../../utils/types';
import { mockOrder, mockOrderData } from '../__mocks__/mocks';

describe('Редьюсеры orderFeedSlice', () => {
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

  const loadingState: TOrderFeedState = { ...initialState, loading: true };

  const stateWithPreview: TOrderFeedState = {
    ...initialState,
    orderPreview: mockOrder
  };

  test('правильно обрабатывается getAllOrders.pending', () => {
    const state = orderFeedReducer(initialState, {
      type: getAllOrders.pending.type
    });

    expect(state).toEqual(loadingState);
  });

  test('правильно обрабатывается getAllOrders.fulfilled', () => {
    const state = orderFeedReducer(loadingState, {
      type: getAllOrders.fulfilled.type,
      payload: mockOrderData
    });

    expect(state).toEqual({ ...initialState, allOrders: mockOrderData });
  });

  test('правильно обрабатывается getAllOrders.rejected', () => {
    const state = orderFeedReducer(loadingState, {
      type: getAllOrders.rejected.type
    });

    expect(state).toEqual(initialState);
  });

  test('правильно обрабатывается getUserOrders.pending', () => {
    const state = orderFeedReducer(initialState, {
      type: getUserOrders.pending.type
    });

    expect(state).toEqual(loadingState);
  });

  test('правильно обрабатывается getUserOrders.fulfilled', () => {
    const orders: TOrder[] = [mockOrder];

    const state = orderFeedReducer(loadingState, {
      type: getUserOrders.fulfilled.type,
      payload: orders
    });

    expect(state).toEqual({ ...initialState, userOrders: orders });
  });

  test('правильно обрабатывается getUserOrders.rejected', () => {
    const state = orderFeedReducer(loadingState, {
      type: getUserOrders.rejected.type
    });

    expect(state).toEqual(initialState);
  });

  test('правильно обрабатывается getOrderByNumber.pending', () => {
    const state = orderFeedReducer(stateWithPreview, {
      type: getOrderByNumber.pending.type
    });

    expect(state).toEqual(loadingState);
  });

  test('правильно обрабатывается getOrderByNumber.fulfilled', () => {
    const state = orderFeedReducer(loadingState, {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    });

    expect(state).toEqual(stateWithPreview);
  });

  test('правильно обрабатывается getOrderByNumber.rejected', () => {
    const loadingStateWithPreview: TOrderFeedState = {
      ...stateWithPreview,
      loading: true
    };

    const state = orderFeedReducer(loadingStateWithPreview, {
      type: getOrderByNumber.rejected.type
    });

    expect(state).toEqual(initialState);
  });
});
