import ingredientsReducer, {
  TIngredientsState,
  getIngredients
} from '../ingredientsSlice';
import { TIngredient } from '../../utils/types';
import { mockIngredient, mockBun } from '../__mocks__/mocks';

describe('Редьюсеры ingredientsSlice', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    loading: false
  };

  test('правильно обрабатывается getIngredients.pending', () => {
    const state = ingredientsReducer(initialState, {
      type: getIngredients.pending.type
    });

    expect(state).toEqual({
      ingredients: [],
      loading: true
    });
  });

  test('правильно обрабатывается getIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [mockIngredient, mockBun];

    const state = ingredientsReducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    });

    expect(state).toEqual({
      ingredients: mockIngredients,
      loading: false
    });
  });

  test('правильно обрабатывается getIngredients.rejected', () => {
    const previousState = {
      ingredients: [],
      loading: true
    };

    const state = ingredientsReducer(previousState, {
      type: getIngredients.rejected.type
    });

    expect(state).toEqual({
      ingredients: [],
      loading: false
    });
  });
});
