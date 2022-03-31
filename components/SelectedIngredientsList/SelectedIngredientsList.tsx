import { SelectedIngredientsProps } from './SelectedIngredientList.types';

export default function SelectedIngredients({ ingredients }: SelectedIngredientsProps) {

  return (
    <>
      {ingredients.map((x, k) => <p key={k}>{x}</p>)}
    </>
  )
}
