import React, { useEffect, useState } from 'react'
import { RecipeResultsProps, RecipeResponse } from './type';
import RecipeCard from "../RecipeCard";


export default function RecipeResults( { ingredients }:RecipeResultsProps ) {
  const [results, setResults] = useState<RecipeResponse[]>([]);

  useEffect(() => {
    if(ingredients.length === 0){
      setResults([]);
      return;
    }
    const concatenatedIngredient = ingredients.join(",");
    fetch(`https://localhost:7255/api/recipes?ingredients=${concatenatedIngredient}`, { mode: 'cors' })
      .then(response => response.json())
      .then((data: RecipeResponse[]) => setResults(data));
  }, [ingredients]);

  return (
    <ul>
      {results.map(result => <RecipeCard title={result.title} image={result.image} key={result.id} />)}
    </ul>
  )
}
