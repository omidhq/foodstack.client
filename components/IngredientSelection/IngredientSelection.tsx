import React, { useEffect, useState } from 'react'
import SelectedIngredientsList from '../SelectedIngredientsList'
import { IngredientResponse, IngredientSelectionProp } from './IngredientSelection.types'
import styles from './IngredientSelection.module.css'

export default function IngredientSelection({ ingredientQuery }: IngredientSelectionProp) {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>()
  const [newIngredient, setNewIngredient] = useState<string>('')

  const [ingredientArray, setIngredientArray] = useState<string[]>([])

  const [validationError, setvalidationError] = useState('')

  const showError = (errorCause?: string) => {
    if (errorCause === 'empty') {
      setvalidationError("The ingredient feild can't be empty!")
    } else if (errorCause === 'invalid') {
      setvalidationError('Please enter a valid ingredient!')
    } else {
      setvalidationError('You have already entered the ingredient!')
    }
    setTimeout(setvalidationError, 4000, '')
  }

  useEffect(() => {
    fetch('https://localhost:7255/api/ingredients', { mode: 'cors' })
      .then((response) => response.json())
      .then((data: IngredientResponse[]) => setIngredients(data))
  }, [])

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newIngredient || newIngredient.trim() === '') {
      showError('empty')
    } else if (ingredientArray.includes(newIngredient)) {
      showError('duplicate')
    } else if (ingredients?.every((i) => i.name !== newIngredient)) {
      showError('invalid')
    } else {
      setIngredientArray((oldIngredients) => [...oldIngredients, newIngredient])
    }

    setNewIngredient('')
  }

  const removeItem = (index: number) => setIngredientArray(ingredientArray.filter((v, arrIndex) => index !== arrIndex));

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
        <button type='submit' className={`${styles.searchIcon} bg-gray-300 rounded-r`}></button>

        <datalist id='ingredient-list'>
          {ingredients?.map((i) => (
            <option value={i.name} key={i.id} />
          ))}
        </datalist>
      </form>

      <SelectedIngredientsList ingredients={ingredientArray} callback={removeItem} />

      <button onClick={() => ingredientQuery(ingredientArray)}>
        Find Recipes
      </button>
      <div className="absolute top-14 mt-10 bg-red-200 text-red-900">
        <span>
          {validationError}
        </span>
      </div>
    </>
  )
}
