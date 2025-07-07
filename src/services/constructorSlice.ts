import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';

type TConstructorState = {
    bun: TIngredient | null;
    ingredients: Array<TIngredient>;
}

const initialState: TConstructorState = {
    bun: null,
    ingredients: [],
};

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<TIngredient>) => {
            if (action.payload.type === 'bun') {
                state.bun = action.payload;
            }
            else {
                state.ingredients.push(action.payload);
            }
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients = state.ingredients.filter(b => b._id !== action.payload);
        },
        resetConstructor: () => initialState
    }
});

export const { addIngredient, removeIngredient, resetConstructor } = constructorSlice.actions;