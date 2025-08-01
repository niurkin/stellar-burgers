import orderReducer, {
  TOrderState,
  placeOrder,
  clearOrder,
  clearlastOrder,
  setOrder
} from '../orderSlice';
import { mockOrder } from '../__mocks__/mocks';

const currentOrder: Array<string> = mockOrder.ingredients;

describe('Редьюсеры orderSlice', () => {
  const initialState: TOrderState = {
    loading: false,
    order: [],
    lastOrder: null
  };

  const stateWithOrder: TOrderState = { ...initialState, order: currentOrder };

  const stateWithLastOrder: TOrderState = {
    ...initialState,
    lastOrder: mockOrder
  };

  const loadingState: TOrderState = { ...initialState, loading: true };

  test('заказ добавляется в поле order', () => {
    const state: TOrderState = orderReducer(
      initialState,
      setOrder(currentOrder)
    );

    expect(state).toEqual(stateWithOrder);
  });

  test('заказ успешно удаляется', () => {
    const state: TOrderState = orderReducer(stateWithOrder, clearOrder());

    expect(state).toEqual(initialState);
  });

  test('последний заказ успешно удаляется', () => {
    const state: TOrderState = orderReducer(
      stateWithLastOrder,
      clearlastOrder()
    );

    expect(state).toEqual(initialState);
  });

  test('правильно обрабатывается placeOrder.pending', () => {
    const state = orderReducer(initialState, {
      type: placeOrder.pending.type
    });

    expect(state.loading).toBe(true);
  });

  test('правильно обрабатывается placeOrder.fulfilled', () => {
    const loadingStateWithOrder: TOrderState = {
      ...loadingState,
      order: currentOrder
    };

    const state = orderReducer(loadingStateWithOrder, {
      type: placeOrder.fulfilled.type,
      payload: { order: mockOrder }
    });

    expect(state).toEqual(stateWithLastOrder);
  });

  test('правильно обрабатывается placeOrder.rejected', () => {
    const state = orderReducer(loadingState, {
      type: placeOrder.rejected.type
    });

    expect(state.loading).toBe(false);
  });
});
