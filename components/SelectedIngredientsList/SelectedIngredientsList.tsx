import { SelectedIngredientsProps } from './SelectedIngredientList.types';

export default function SelectedIngredients({ ingredients, callback }: SelectedIngredientsProps) {

  return (
    <div className='p-2'>
      {
        ingredients.map((ingredient, key) => 
          <div key={key} className='text-sm inline-flex bg-gray-200 rounded-m m-1 '>
            <div className='capitalize p-1 pl-2'>{ingredient}</div>
            <button className='text-xs pl-1 pr-2 font-black' onClick={() => callback(key)}>✕</button>
          </div>
        )
      }
    </div>
  )
}
