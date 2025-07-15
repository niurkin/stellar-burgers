import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData,
  TUserResponse,
} from '../utils/burger-api';
import { RootState } from './store';

export type TUserState = {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
  loading: boolean;
  error: string;
};

const initialState: TUserState = {
  isAuthenticated: false,
  isAuthChecked: false,
  user: null,
  loading: false,
  error: ''
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  })
);

export const checkUserAuth = createAsyncThunk(
  'user/check',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(setAuthChecked());
      });
    } else {
      dispatch(setAuthChecked());
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = '';
    },
    setAuthChecked(state) {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = '';
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = '';
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.loading = false;
          state.error = '';
          state.isAuthChecked = true;
        }
      )
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.error = '';
        }
      )
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = '';
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      });
  }
});

export const selectUserData = (state: RootState) => state.user;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectUserAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const { setError, clearError, setAuthChecked } = userSlice.actions;
