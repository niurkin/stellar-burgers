import { Middleware } from '@reduxjs/toolkit';

export const errorLogMiddleware: Middleware = () => (next: any) => (action: any) => {
  if (action.type.endsWith('/rejected') && action.error) {
    const actionType = action.type;
    const [name, method, ...rest] = actionType.split('/');

    switch (`${name}/${method}`) {
      case 'ingredients/get':
        console.error(`Не удалось загрузить ингредиенты. Ошибка: ${action.error.message}`);
        break;
      default:
        console.error(`Ошибка: ${action.error.message}`);
    }
  }

  return next(action);
};