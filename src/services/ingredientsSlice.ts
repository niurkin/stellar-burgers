import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

type TIngredientsState = {
    ingredients: Array<TIngredient>;
    loading: boolean;
}

const initialState: TIngredientsState = {
    ingredients: [],
    loading: false,
};

export const getIngredients = createAsyncThunk(
   "ingredients/get",
   async () => {
    return getIngredientsApi();
   },
);


export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {},
    selectors: {
        selectIngredients: (state) => state.ingredients,
        selectIngredientsLoading: (state) => state.loading,
    },
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

export const { selectIngredients, selectIngredientsLoading } = ingredientsSlice.selectors;
export const selectIngredient = (id: string) => (state: { ingredients: TIngredientsState }) => state.ingredients.ingredients.find(ingredient => ingredient._id === id);