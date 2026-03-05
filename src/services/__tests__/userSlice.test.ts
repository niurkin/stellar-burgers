import userReducer, {
  TUserState,
  setError,
  clearError,
  setAuthChecked,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser
} from '../userSlice';
import { mockUser, mockUser2 } from '../__mocks__/mocks';

const mockError: string = 'Произошла ошибка';

describe('Редьюсеры userSlice', () => {
  const authThunks = [
    { thunk: registerUser, name: 'registerUser' },
    { thunk: loginUser, name: 'loginUser' },
    { thunk: getUser, name: 'getUser' }
  ];

  const initialState: TUserState = {
    isAuthenticated: false,
    isAuthChecked: false,
    user: null,
    loading: false,
    error: ''
  };

  const loggedInState: TUserState = {
    isAuthenticated: true,
    isAuthChecked: true,
    user: mockUser,
    loading: false,
    error: ''
  };

  const loadingState: TUserState = { ...initialState, loading: true };

  const loadingLoggedInState: TUserState = { ...loggedInState, loading: true };

  const stateWithAuthChecked: TUserState = {
    ...initialState,
    isAuthChecked: true
  };

  const stateWithError: TUserState = { ...initialState, error: mockError };

  test('добавляется сообщение об ошибке', () => {
    const state = userReducer(initialState, setError(mockError));

    expect(state).toEqual(stateWithError);
  });

  test('удаляется сообщение об ошибке', () => {
    const state = userReducer(stateWithError, clearError());

    expect(state).toEqual(initialState);
  });

  test('отмечается проверка аутентификации', () => {
    const state = userReducer(initialState, setAuthChecked());

    expect(state).toEqual(stateWithAuthChecked);
  });

  test('правильно обрабатывается updateUser.pending', () => {
    const state = userReducer(loggedInState, {
      type: updateUser.pending.type
    });

    expect(state).toEqual(loadingLoggedInState);
  });

  test('правильно обрабатывается updateUser.fulfilled', () => {
    const state = userReducer(loadingLoggedInState, {
      type: updateUser.fulfilled.type,
      payload: { user: mockUser2 }
    });

    expect(state).toEqual({ ...loggedInState, user: mockUser2 });
  });

  test('правильно обрабатывается updateUser.rejected', () => {
    const state = userReducer(loadingLoggedInState, {
      type: updateUser.rejected.type
    });

    expect(state).toEqual(loggedInState);
  });

  test('правильно обрабатывается logoutUser.pending', () => {
    const state = userReducer(loggedInState, {
      type: logoutUser.pending.type
    });

    expect(state).toEqual(loadingLoggedInState);
  });

  test('правильно обрабатывается logoutUser.fulfilled', () => {
    const state = userReducer(loadingLoggedInState, {
      type: logoutUser.fulfilled.type
    });

    expect(state).toEqual(stateWithAuthChecked);
  });

  test('правильно обрабатывается logoutUser.rejected', () => {
    const state = userReducer(loadingLoggedInState, {
      type: logoutUser.rejected.type
    });

    expect(state).toEqual(loggedInState);
  });

  authThunks.forEach(({ thunk, name }) => {
    describe(`${name}`, () => {
      test(`правильно обрабатывается ${name}.loading`, () => {
        const state = userReducer(initialState, { type: thunk.pending.type });

        expect(state).toEqual(loadingState);
      });

      test(`правильно обрабатывается ${name}.fulfilled`, () => {
        const state = userReducer(loadingState, {
          type: thunk.fulfilled.type,
          payload: { user: mockUser }
        });

        expect(state).toEqual(loggedInState);
      });

      test(`правильно обрабатывается ${name}.rejected`, () => {
        const state = userReducer(loadingState, {
          type: thunk.rejected.type
        });

        expect(state).toEqual(stateWithAuthChecked);
      });
    });
  });
});
