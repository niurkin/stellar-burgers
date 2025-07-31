import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../ingredientsSlice';
import { constructorSlice } from '../constructorSlice';
import { orderFeedSlice } from '../orderFeedSlice';
import { userSlice } from '../userSlice';
import { orderSlice } from '../orderSlice';

describe('Проверка инициализации rootReducer', () => {
  const rootReducer = combineSlices(
    ingredientsSlice,
    constructorSlice,
    orderFeedSlice,
    userSlice,
    orderSlice
  );

  test('возвращает корректное начальное состояние хранилища при вызове с undefined состоянием и экшеном', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('ingredientList');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('orderFeed');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('currentOrder');

    expect(state.ingredientList).toEqual(ingredientsSlice.getInitialState());
    expect(state.burgerConstructor).toEqual(constructorSlice.getInitialState());
    expect(state.orderFeed).toEqual(orderFeedSlice.getInitialState());
    expect(state.user).toEqual(userSlice.getInitialState());
    expect(state.currentOrder).toEqual(orderSlice.getInitialState());
  });
});
