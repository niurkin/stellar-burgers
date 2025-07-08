import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../utils/types';
import { nanoid } from '@reduxjs/toolkit';
import { RootState } from './store';

export type TConstructorState = {
    bun: TIngredient | undefined;
    ingredients: Array<TConstructorIngredient>;
}

const initialState: TConstructorState = {
    bun: undefined,
    ingredients: [],
};

export const constructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addIngredient: {
       reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
           },
           prepare: (ingredient: TIngredient) => {
            const id = nanoid();
                return { payload: {...ingredient, id } };
           }
       },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients = state.ingredients.filter(b => b._id !== action.payload);
        },
        resetConstructor: () => initialState
    }
});

export const { addIngredient, removeIngredient, resetConstructor } = constructorSlice.actions;
export const selectConstructorState = (state: RootState) => state.burgerConstructor;