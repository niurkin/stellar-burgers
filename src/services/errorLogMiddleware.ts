import { Middleware } from '@reduxjs/toolkit';
import { setError } from './userSlice';

export const errorLogMiddleware: Middleware =
  (store) => (next: any) => (action: any) => {
    if (action.type.endsWith('/rejected') && action.error) {
      const message = action.error.message;
      const [name, method, ...rest] = action.type.split('/');

      const errorText = (() => {
        switch (`${name}/${method}`) {
          case 'ingredients/get':
            return `Не удалось загрузить ингредиенты. Ошибка: ${message}`;
          case 'orders/get':
            return `Не удалось загрузить ленту заказов. Ошибка: ${message}`;
          case 'orders/getByNumber':
            return `Не удалось загрузить данные заказа. Ошибка: ${message}`;
          case 'user/register':
            return `Не удалось зарегистрироваться. Ошибка: ${message}`;
          case 'user/login':
            return `Не удалось войти в учетную запись. Ошибка: ${message}`;
          case 'user/get':
            return `Не удалось получить данные пользователя. Ошибка: ${message}`;
          case 'user/update':
            return `Не удалось обновить данные пользователя. Ошибка: ${message}`;
          case 'user/logout':
            return `Не удалось выйти из учетной записи. Ошибка: ${message}`;
          case 'user/check':
            return `Не удалось проверить авторизацию. Ошибка: ${message}`;
          case 'user/resetPassword':
            return `Не удалось восстановить пароль. Ошибка: ${message}`;
          case 'order/place':
            return `Не удалось сделать заказ. Ошибка: ${message}`;
          case 'order/placeFromConstructor':
            return `Не удалось сделать заказ в конструкторе. Ошибка: ${message}`;
          default:
            return `Ошибка: ${message}`;
        }
      })();

      console.error(errorText);

      if (name === 'user') {
        store.dispatch(setError(errorText));
      }
    }

    return next(action);
  };
