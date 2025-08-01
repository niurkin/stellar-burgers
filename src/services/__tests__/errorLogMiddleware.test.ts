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

  test('передает экшены дальше', () => {
    const { next, invoke } = create();
    const action: UnknownAction = { type: 'TEST_ACTION' };

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
  });
});
