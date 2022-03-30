import { useEffect, useState } from "react";

interface SelectedIngredientsProps {
  newIngredient: string
}

export default function SelectedIngredients({newIngredient}:SelectedIngredientsProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    setIngredients(oldIngredients => [...oldIngredients, newIngredient]);
  }, [newIngredient]);

  return (
    <>
      {ingredients.map((x, k) => <p key={k}>{x}</p>)}
    </>
  )
}
