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
                if (action.payload.type === 'bun') {
                    state.bun = action.payload;
                } else {
                    state.ingredients.push(action.payload);
                }
            },
            prepare: (ingredient: TIngredient) => {
                const id = nanoid();
                return { payload: {...ingredient, id } };
            }
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients = state.ingredients.filter(b => b.id !== action.payload);
        },
        reorderIngredient: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
            const { fromIndex, toIndex } = action.payload;
            const updated = [...state.ingredients];
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, moved);
            state.ingredients = updated;
        },
        resetConstructor: () => initialState
    }
});

export const { addIngredient, removeIngredient, reorderIngredient, resetConstructor } = constructorSlice.actions;
export const selectConstructorState = (state: RootState) => state.burgerConstructor;
export const selectConstructorIngredients = (state: RootState) => state.burgerConstructor.ingredients;