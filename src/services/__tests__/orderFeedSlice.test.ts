import orderFeedReducer, {
  getAllOrders,
  getUserOrders,
  getOrderByNumber,
  TOrderFeedState
} from '../orderFeedSlice';
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

  const loadingState: TOrderFeedState = {...initialState, loading: true};

   test('правильно обрабатывается getAllOrders.pending', () => {
    const state = orderFeedReducer(initialState, {
      type: getAllOrders.pending.type
    });

    expect(state.loading).toBe(true);
  });

  test('правильно обрабатывается getAllOrders.fulfilled', () => {
    const state = orderFeedReducer(loadingState, {
      type: getAllOrders.fulfilled.type,
      payload: mockOrderData
    });

    expect(state.loading).toBe(false);
    expect(state.allOrders).toEqual(mockOrderData);
  });

  test('правильно обрабатывается getAllOrders.rejected', () => {
    const state = orderFeedReducer(loadingState, {
      type: getAllOrders.rejected.type
    });

    expect(state.loading).toBe(false);
  });

  test('правильно обрабатывается getUserOrders.pending', () => {
    const state = orderFeedReducer(initialState, {
      type: getUserOrders.pending.type
    });

    expect(state.loading).toBe(true);
  });

  test('правильно обрабатывается getUserOrders.fulfilled', () => {
    const orders = [ mockOrder ];

    const state = orderFeedReducer(loadingState, {
      type: getUserOrders.fulfilled.type,
      payload: orders
    });

    expect(state.loading).toBe(false);
    expect(state.userOrders).toEqual(orders);
  });

  test('правильно обрабатывается getUserOrders.rejected', () => {
    const state = orderFeedReducer(loadingState, {
      type: getUserOrders.rejected.type
    });

    expect(state.loading).toBe(false);
  });

  test('правильно обрабатывается getOrderByNumber.pending', () => {
    const stateWithPreview: TOrderFeedState = {...initialState, orderPreview: mockOrder};

    const state = orderFeedReducer(stateWithPreview, {
      type: getOrderByNumber.pending.type
    });

    expect(state.loading).toBe(true);
    expect(state.orderPreview).toBe(null);
  });

  test('правильно обрабатывается getOrderByNumber.fulfilled', () => {
    const data = { orders: [ mockOrder ]};

    const state = orderFeedReducer(loadingState, {
      type: getOrderByNumber.fulfilled.type,
      payload: data
    });

    expect(state.loading).toBe(false);
    expect(state.orderPreview).toEqual(mockOrder);
  });

  test('правильно обрабатывается getOrderByNumber.rejected', () => {
    const loadingStateWithPreview: TOrderFeedState = {...loadingState, orderPreview: mockOrder};

    const state = orderFeedReducer(loadingStateWithPreview, {
      type: getOrderByNumber.rejected.type
    });

    expect(state.loading).toBe(false);
    expect(state.orderPreview).toBe(null);
  });
});
