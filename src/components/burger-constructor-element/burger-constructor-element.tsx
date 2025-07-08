import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { removeIngredient, reorderIngredient, selectConstructorIngredients } from '../../services/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleReorder = (from: number, to: number) => {
      dispatch(reorderIngredient({ fromIndex: from, toIndex: to }));
    };
    
    const ingredients = useSelector(selectConstructorIngredients);
    const ingredientIndex = ingredients.findIndex(item => item.id === ingredient.id);
    
    const handleMoveDown = () => handleReorder(ingredientIndex, ingredientIndex + 1);

    const handleMoveUp = () => handleReorder(ingredientIndex, ingredientIndex - 1);

    const handleClose = () => dispatch(removeIngredient(ingredient.id));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
