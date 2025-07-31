import { TIngredient } from '../../utils/types';

export const mockIngredient: TIngredient = {
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

export const mockBun: TIngredient = {
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