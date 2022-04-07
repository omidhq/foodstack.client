import React, { useEffect, useLayoutEffect, useState } from 'react'
import SelectedIngredientsList from '../SelectedIngredientsList'
import InputValidationError from '../InputValidationError'
import { IngredientResponse } from './IngredientSelection.types'
import styles from './IngredientSelection.module.css'
import Link from 'next/link'

export default function IngredientSelection() {

  const [ingredients, setIngredients] = useState<IngredientResponse[]>()
  const [newIngredient, setNewIngredient] = useState<string>('')
  const [ingredientArray, setIngredientArray] = useState<string[]>([])
  const [validationError, setvalidationError] = useState('')

  useEffect(() => {
    fetch('https://localhost:7255/api/ingredients', { mode: 'cors' })
      .then((response) => response.json())
      .then((data: IngredientResponse[]) => setIngredients(data))
  }, [])


  useLayoutEffect(() => {
    if (sessionStorage.getItem('ingredientArray')) {
      setIngredientArray(sessionStorage.getItem('ingredientArray')?.split(',') ?? [])
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('ingredientArray', ingredientArray.join(','))
  }, [ingredientArray])

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newIngredient || newIngredient.trim() === '') {
      setvalidationError("empty")
    } else if (ingredientArray.includes(newIngredient)) {
      setvalidationError("duplicate")
    } else if (ingredients?.every((i) => i.name !== newIngredient)) {
      setvalidationError("invalid")
    } else {
      setIngredientArray((oldIngredients) => [...oldIngredients, newIngredient])
    }

    setTimeout(setvalidationError, 4000, 'hide')

    setNewIngredient('')
  }

  const removeItem = (index: number) => setIngredientArray(ingredientArray.filter((v, arrIndex) => index !== arrIndex));

  return (
    <>
      <form onSubmit={submitForm} className="flex w-lg relative">
        <input
          list='ingredient-list'
          id='ingredient-choice'
          name='ingredient-choice'
          className='border-2 border-gray-300 bg-gray-300 rounded focus:outline-none py-2 px-4 h-14 w-full'
          onChange={(e) => {
            setNewIngredient(e.target.value)
          }}
          value={newIngredient}
          placeholder="Type an ingredient"
        />
        <button type='submit' className={`${styles.addIcon} bg-gray-300 rounded absolute right-0`}></button>

        <datalist id='ingredient-list'>
          {ingredients?.map((i) => (
            <option value={i.name} key={i.id} />
          ))}
        </datalist>
      </form>

      <SelectedIngredientsList ingredients={ingredientArray} callback={removeItem} />

      <Link
        href={{
          pathname: '/search',
          query: {
            ingredients: ingredientArray.join(','),
            page: 1
          },
        }}   
        passHref     
      >
        <button className={`${styles.searchIcon} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 pl-4 pr-10 rounded relative self-end`}>
        Find Recipes
      </button>

      </Link>
      
      <InputValidationError errorClassName={validationError} />
    </>
  )
}
