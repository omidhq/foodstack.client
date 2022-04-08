import React, { useEffect, useState } from 'react'
import { FullRecipeProp, Steps, OtherIngredient } from './FullRecipe.types'
import styles from './FullRecipe.module.css'

export default function FullRecipe({ recipeId }: FullRecipeProp) {
  const [steps, setSteps] = useState<Steps[]>([]);
  const [otherIngredients, setOtherIngredients] = useState<OtherIngredient[]>([])

  useEffect(() => {
    fetch(`https://localhost:7255/api/instructions?recipeId=${recipeId}`, { mode: 'cors' })
      .then((response) => response.json())
      .then((data: Steps[]) => setSteps(data))
  }, [recipeId])

  return (
    <div className='w-56'>
      <div>
        <p>Ingredients</p>
        <ul></ul>
        <p>Missing Ingredients</p>
        <ul></ul>
      </div>
      <ol className='list-decimal'>{steps[0]?.steps?.map((x, k) => <><li key={k}>{x.step}</li><br></br></>)}</ol>
    </div>
  )
}
