import { TIngredient, TOrder, TOrdersData } from '../../utils/types';

export const mockIngredient: TIngredient = {
  _id: 'main-id',
  name: 'Котлета',
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

export const mockBun: TIngredient = {
  _id: 'bun-id',
  name: 'Булка',
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

export const mockOrder: TOrder = {
  _id: 'order-id',
  status: 'pending',
  name: 'Бургер',
  createdAt: '2025-07-28T19:16:19.874Z',
  updatedAt: '2025-07-28T19:16:20.686Z',
  number: 77777,
  ingredients: ['bun-id', 'main-id', 'bun-id']
};

export const mockOrderData: TOrdersData = {
  orders: [ mockOrder ],
  total: 1000,
  totalToday: 50
};