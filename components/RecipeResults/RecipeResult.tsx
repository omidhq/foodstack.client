import React, { useEffect, useState } from 'react'
import { RecipeResultsProps, RecipeResponse } from './RecipeResult.types';
import RecipeCard from "../RecipeCard";
import Pagination from '../Pagination';
import { useRouter } from 'next/router';


export default function RecipeResults() {

  const [results, setResults] = useState<RecipeResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const maxPerPage:number = 20;

  const router = useRouter()
  const [ingredients, setIngredients] = useState<string[]>([])

  useEffect(() => {
    if (router.isReady) {
      const query =  router.query.ingredients as any;
      const page = router.query.page as any;
      if (query){
        setIngredients(query.split(','));
        setCurrentPage(page)
      }      
    }
}, [router])

  useEffect(() => {
    if (ingredients.length === 0) {
      setResults([]);
      return;
    }
    const concatenatedIngredient = ingredients.join(",");
    fetch(`https://localhost:7255/api/recipes?ingredients=${concatenatedIngredient}`, { mode: 'cors' })
      .then(response => response.json())
      .then((data: RecipeResponse[]) => setResults(data));
  }, [ingredients]);

  const startingOffset = () => ((currentPage - 1) * maxPerPage);

  return (
    <>
      <ul className='mt-6 max-w-xl'>
        {
          results.slice(startingOffset(), startingOffset() + maxPerPage).map(result => <RecipeCard title={result.title} image={result.image} key={result.id} />)
        }
      </ul>
      <Pagination pageNumber={setCurrentPage} maxPages={results.length / maxPerPage} />
    </>
  )
}
