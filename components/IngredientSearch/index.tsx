import React, { useEffect, useState } from 'react'
import { IngredientResponse } from './type';

export default function IngredientSearch() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>();

  useEffect(() => {
    fetch("https://localhost:7255/api/ingredients", { mode: 'cors' })
      .then(response => response.json())
      .then((data: IngredientResponse[]) => setIngredients(data));
  }, []);

  return (
    <>
      <label htmlFor="ingredient-choice">Choose an ingredient:</label>
      <input list="ingredient-list" id="ingredient-choice" name="ingredient-choice" />

      <datalist id="ingredient-list">
        {ingredients?.map(i => <option value={i.name} key={i.id}/>)}
      </datalist> 
    </>
  )
}
