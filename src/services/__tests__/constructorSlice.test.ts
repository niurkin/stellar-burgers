import constructorReducer, {
  addIngredient,
  removeIngredient,
  reorderIngredient,
  resetConstructor,
  TConstructorState
} from '../constructorSlice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

const mockIngredient: TIngredient = {
  _id: 'main-id',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'image-url',
  image_mobile: 'image-mobile-url',
  image_large: 'image-large-url'
};

const mockBun: TIngredient = {
  _id: 'bun-id',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'image-url',
  image_mobile: 'image-mobile-url',
  image_large: 'image-large-url'
};

const createConstructorIngredient = (ingredient: TIngredient, newId: string): TConstructorIngredient => {
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

    expect(emptyState.ingredients).toHaveLength(0);
  });

  test('порядок ингредиентов успешно изменяется', () => {
    const mockIngredient1: TConstructorIngredient =
      createConstructorIngredient(mockIngredient, '1');
    const mockIngredient2: TConstructorIngredient =
      createConstructorIngredient(mockIngredient, '2');

    const state: TConstructorState = {
      bun: undefined,
      ingredients: [mockIngredient1, mockIngredient2]
    };

    const reorderedState: TConstructorState = constructorReducer(
      state,
      reorderIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(reorderedState.ingredients[0].id).toBe('2');
    expect(reorderedState.ingredients[1].id).toBe('1');
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
