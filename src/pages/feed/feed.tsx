import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectAllOrders, selectOrdersLoading, getAllOrders } from '../../services/orderFeedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const odersData = useSelector(selectAllOrders);
  const orders: TOrder[] = odersData.orders;
  const isLoading = useSelector(selectOrdersLoading);

  useEffect(() => {
        dispatch(getAllOrders());
      }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllOrders())} />;
};
