import { useEffect, useState } from "react";

interface SelectedIngredientsProps {
  ingredients: string[]
}

export default function SelectedIngredients({ingredients}:SelectedIngredientsProps) {
  
  return (
    <>
      {ingredients.map((x, k) => <p key={k}>{x}</p>)}
    </>
  )
}
