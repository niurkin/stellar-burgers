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

  const loadingState: TIngredientsState = { ...initialState, loading: true };

  test('правильно обрабатывается getIngredients.pending', () => {
    const state = ingredientsReducer(initialState, {
      type: getIngredients.pending.type
    });

    expect(state).toEqual(loadingState);
  });

  test('правильно обрабатывается getIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [mockIngredient, mockBun];

    const state = ingredientsReducer(loadingState, {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    });

    expect(state).toEqual({
      ingredients: mockIngredients,
      loading: false
    });
  });

  test('правильно обрабатывается getIngredients.rejected', () => {
    const state = ingredientsReducer(loadingState, {
      type: getIngredients.rejected.type
    });

    expect(state).toEqual(initialState);
  });
});
