import { SelectedIngredientsProps } from './SelectedIngredientList.types';

export default function SelectedIngredients({ ingredients, callback }: SelectedIngredientsProps) {

  return (
    <>
      {
        ingredients.map((x, k) => 
          <div key={k}>
            <p>{x}</p> 
            <button onClick={() => callback(k)}>Remove</button>
          </div>
        )
      }
    </>
  )
}
