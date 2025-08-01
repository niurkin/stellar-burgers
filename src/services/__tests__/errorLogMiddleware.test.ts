import { UnknownAction, MiddlewareAPI } from '@reduxjs/toolkit';
import { errorLogMiddleware } from '../errorLogMiddleware';
import { setError } from '../userSlice';

const create = () => {
  const store: MiddlewareAPI = {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({}))
  };
  const next = jest.fn();
  const invoke = (action: UnknownAction) =>
    errorLogMiddleware(store)(next)(action);

  return { store, next, invoke };
};

describe('Тесты errorLogMiddleware', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('экшены правильно передаются дальше', () => {
    const { next, invoke } = create();
    const action: UnknownAction = { type: 'TEST_ACTION' };

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
  });

  test('ошибки, связанные со слайсом пользователя, выводятся в консоль, и вызывается setError', () => {
    const { store, invoke } = create();
    const action = {
      type: 'user/login/rejected',
      error: { message: 'Test Error' }
    };

    invoke(action);

    expect(console.error).toHaveBeenCalledWith(
      'Не удалось войти в учетную запись. Ошибка: Test Error'
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      setError('Не удалось войти в учетную запись. Ошибка: Test Error')
    );
  });

  test('ошибки, не относящиеся к слайсу пользователя, выводятся в консоль без вызова setError', () => {
    const { store, invoke } = create();
    const action = {
      type: 'orders/get/rejected',
      error: { message: 'Test Error' }
    };

    invoke(action);

    expect(console.error).toHaveBeenCalledWith(
      'Не удалось загрузить ленту заказов. Ошибка: Test Error'
    );
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
