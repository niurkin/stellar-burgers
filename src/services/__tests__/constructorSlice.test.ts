import constructorReducer, {
  addIngredient,
  removeIngredient,
  reorderIngredient,
  resetConstructor,
  TConstructorState
} from '../constructorSlice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { mockIngredient, mockBun } from '../__mocks__/mocks';

const createConstructorIngredient = (
  ingredient: TIngredient,
  newId: string
): TConstructorIngredient => {
  return { ...ingredient, id: newId };
};

describe('Редьюсеры constructorSlice', () => {
  const initialState: TConstructorState = {
    bun: undefined,
    ingredients: []
  };

  test('булка добавляется в поле bun', () => {
    const state: TConstructorState = constructorReducer(
      initialState,
      addIngredient(mockBun)
    );

    expect(state.bun).toEqual(expect.objectContaining(mockBun));
    expect(state.ingredients).toHaveLength(0);
  });

  test('начинка добавляется в массив ingredients', () => {
    const state: TConstructorState = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining(mockIngredient)
    );
    expect(state.bun).toBeUndefined();
  });

  test('ингредиент удаляется по id', () => {
    const state: TConstructorState = {
      bun: undefined,
      ingredients: [createConstructorIngredient(mockIngredient, '1')]
    };

    const emptyState: TConstructorState = constructorReducer(
      state,
      removeIngredient('1')
    );

    expect(emptyState).toEqual(initialState);
  });

  test('порядок ингредиентов успешно изменяется', () => {
    const mockIngredient1: TConstructorIngredient = createConstructorIngredient(
      mockIngredient,
      '1'
    );
    const mockIngredient2: TConstructorIngredient = createConstructorIngredient(
      mockIngredient,
      '2'
    );

    const state: TConstructorState = {
      bun: undefined,
      ingredients: [mockIngredient1, mockIngredient2]
    };

    const reorderedState: TConstructorState = constructorReducer(
      state,
      reorderIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(reorderedState).toEqual({
      bun: undefined,
      ingredients: [mockIngredient2, mockIngredient1]
    });
  });

  test('состояние успешно сбрасывается', () => {
    const state: TConstructorState = {
      bun: createConstructorIngredient(mockBun, '1'),
      ingredients: [createConstructorIngredient(mockIngredient, '2')]
    };

    const emptyState: TConstructorState = constructorReducer(
      state,
      resetConstructor()
    );

    expect(emptyState).toEqual(initialState);
  });
});
