import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';
import { deleteCookie } from '../utils/cookie';
import { registerUserApi, loginUserApi, getUserApi, updateUserApi, logoutApi, TLoginData, TRegisterData, TUserResponse } from '../utils/burger-api';
import { RootState } from './store';

export type TUserState = {
  isAuthenticated: boolean;
  user: TUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

export const registerUser = createAsyncThunk(
   'user/register',
   async (data: TRegisterData) => {
    return registerUserApi(data);
   },
);

export const loginUser = createAsyncThunk(
   'user/login',
   async (data: TLoginData) => {
    return loginUserApi(data);
   },
);

export const getUser = createAsyncThunk(
   'user/get',
   async () => {
    return getUserApi();
   },
);

export const updateUser = createAsyncThunk(
   'user/update',
   async (data: Partial<TRegisterData>) => {
    return updateUserApi(data);
   },
);

export const logoutUser = createAsyncThunk(
   'user/logout',
   async () => {
    return logoutApi()
    .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
      })
   },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  setError(state, action: PayloadAction<string>) {
    state.error = action.payload;
  },
  clearError(state) {
    state.error = null;
  },
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
        state.error = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
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
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const selectUserData = (state: RootState) => state.user;