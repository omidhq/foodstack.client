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

  return (
    <>
      <form onSubmit={submitForm} className="flex">
        <input
          list='ingredient-list'
          id='ingredient-choice'
          name='ingredient-choice'
          autoFocus
          className='border-2 border-gray-300 bg-gray-300 rounded-l focus:outline-none py-2 px-4 h-14 w-96'
          onChange={(e) => {
            setNewIngredient(e.target.value)
          }}
          value={newIngredient}
          placeholder="Type an ingredient"
        />

        <datalist id='ingredient-list'>
          {ingredients?.map((i) => (
            <option value={i.name} key={i.id} />
          ))}
        </datalist>
      </form>

      <SelectedIngredientsList ingredients={ingredientArray} />

      <button onClick={() => ingredientQuery(ingredientArray)}>
        Find Recipes
      </button>
    </>
  )
}
