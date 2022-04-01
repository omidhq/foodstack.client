import React, { useEffect, useState } from 'react'
import SelectedIngredientsList from '../SelectedIngredientsList'
import { IngredientResponse, IngredientSelectionProp } from './IngredientSelection.types'

export default function IngredientSelection({ ingredientQuery }: IngredientSelectionProp) {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>()
  const [newIngredient, setNewIngredient] = useState<string>('')

  const [ingredientArray, setIngredientArray] = useState<string[]>([])

  useEffect(() => {
    fetch('https://localhost:7255/api/ingredients', { mode: 'cors' })
      .then((response) => response.json())
      .then((data: IngredientResponse[]) => setIngredients(data))
  }, [])

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIngredientArray((oldIngredients) => [...oldIngredients, newIngredient])

    setNewIngredient('')
  }

  const removeItem = (index:number) => setIngredientArray(ingredientArray.filter((v, arrIndex) =>  index !== arrIndex));

  return (
    <>
      <form onSubmit={submitForm}>
        <label htmlFor='ingredient-choice'>Choose an ingredient:</label>
        <input
          list='ingredient-list'
          id='ingredient-choice'
          name='ingredient-choice'
          onChange={(e) => {
            setNewIngredient(e.target.value)
          }}
          value={newIngredient}
        />

        <datalist id='ingredient-list'>
          {ingredients?.map((i) => (
            <option value={i.name} key={i.id} />
          ))}
        </datalist>
      </form>

      <SelectedIngredientsList ingredients={ingredientArray} callback={removeItem}/>

      <button onClick={() => ingredientQuery(ingredientArray)}>
        Find Recipes
      </button>
    </>
  )
}
