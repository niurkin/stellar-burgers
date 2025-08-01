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
    const state = constructorReducer(initialState, addIngredient(mockBun));

    expect(state).toEqual({
      ...initialState,
      bun: expect.objectContaining(mockBun)
    });
  });

  test('начинка добавляется в массив ingredients', () => {
    const state = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );

    expect(state).toEqual({
      ...initialState,
      ingredients: [expect.objectContaining(mockIngredient)]
    });
  });

  test('ингредиент удаляется по id', () => {
    const stateWithIngredient: TConstructorState = {
      bun: undefined,
      ingredients: [createConstructorIngredient(mockIngredient, '1')]
    };

    const state = constructorReducer(
      stateWithIngredient,
      removeIngredient('1')
    );

    expect(state).toEqual(initialState);
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

    const stateWithIngredients: TConstructorState = {
      bun: undefined,
      ingredients: [mockIngredient1, mockIngredient2]
    };

    const state = constructorReducer(
      stateWithIngredients,
      reorderIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state).toEqual({
      bun: undefined,
      ingredients: [mockIngredient2, mockIngredient1]
    });
  });

  test('состояние успешно сбрасывается', () => {
    const stateWithIngredients: TConstructorState = {
      bun: createConstructorIngredient(mockBun, '1'),
      ingredients: [createConstructorIngredient(mockIngredient, '2')]
    };

    const state: TConstructorState = constructorReducer(
      stateWithIngredients,
      resetConstructor()
    );

    expect(state).toEqual(initialState);
  });
});
