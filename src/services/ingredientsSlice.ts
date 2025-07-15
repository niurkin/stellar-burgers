import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';
import { RootState } from './store';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false
};

export const getIngredients = createAsyncThunk('ingredients/get', async () =>
  getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredientList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const selectIngredients = (state: RootState) =>
  state.ingredientList.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredientList.loading;
export const selectIngredientById = (id: string) => (state: RootState) =>
  state.ingredientList.ingredients.find((ingredient) => ingredient._id === id);
