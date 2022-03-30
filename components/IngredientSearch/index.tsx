import React, { useEffect, useState } from 'react'
import SelectedIngredients from '../SelectedIngredients';
import { IngredientResponse } from './type';

export default function IngredientSearch() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>();
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [chosenIngredient, setChosenIngredient] = useState<string>("");

  useEffect(() => {
    fetch("https://localhost:7255/api/ingredients", { mode: 'cors' })
      .then(response => response.json())
      .then((data: IngredientResponse[]) => setIngredients(data));
  }, []);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChosenIngredient(newIngredient);

    setNewIngredient("");
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <label htmlFor="ingredient-choice">Choose an ingredient:</label>
        <input list="ingredient-list" id="ingredient-choice" name="ingredient-choice" onChange={(e) => {setNewIngredient(e.target.value)}} value={newIngredient} />

        <datalist id="ingredient-list">
          {ingredients?.map(i => <option value={i.name} key={i.id}/>)}
        </datalist> 
      </form>

      <SelectedIngredients newIngredient={chosenIngredient} />
    </>
  )
}
