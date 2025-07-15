import { FC, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearOrder,
  clearlastOrder,
  selectOrderLoading,
  selectLastOrder
} from '../../services/orderSlice';
import { selectUserAuthenticated } from '../../services/userSlice';
import { placeOrderFromConstructor } from '../../services/placeOrderFromConstructor';
import { buildOrderFromConstructor } from '../../services/buildOrderFromConstructor';
import {
  selectConstructorState,
  TConstructorState
} from '../../services/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectUserAuthenticated);
  const constructorItems: TConstructorState = useSelector(
    selectConstructorState
  );

  const orderRequest = useSelector(selectOrderLoading);

  const orderModalData = useSelector(selectLastOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(placeOrderFromConstructor());
    }
  };
  const closeOrderModal = () => dispatch(clearlastOrder());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  useEffect(() => {
    dispatch(buildOrderFromConstructor());
  }, [constructorItems, dispatch]);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(clearOrder());
    };
  }, [dispatch]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
