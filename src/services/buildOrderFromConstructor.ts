import { AppDispatch, RootState } from './store';
import { setOrder } from './orderSlice';

export const buildOrderFromConstructor =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { ingredients, bun } = getState().burgerConstructor;

    const ingredientIds = ingredients.map((item) => item._id);
    const bunId = bun?._id;

    const fullOrder = bunId ? [bunId, ...ingredientIds, bunId] : ingredientIds;

    dispatch(setOrder(fullOrder));
  };
