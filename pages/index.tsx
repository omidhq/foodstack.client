import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import FullRecipe from '../components/FullRecipe'
import IngredientSearch from '../components/IngredientSelection'
import RecipeResults from '../components/RecipeResults'

const Home: NextPage = () => {
  const [ingredients, setIngredients] = useState<string[]>([])

  const passSearch = (ingredientQuery: string[]) => {
    setIngredients(ingredientQuery)
  }

  return (
    <div className='flex place-content-center'>
      <Head>
        <title>Foodstack</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='w-lg flex flex-col h-screen justify-between'>
        <header className='bg-gray-100 p-5 mb-12 rounded-b-3xl'>
          <h1 className='text-2xl uppercase text-center leading-loose font-semibold text-blue-500'>Foodstack</h1>
          <nav></nav>
        </header>
        <main>
          <IngredientSearch ingredientQuery={passSearch} />
          <RecipeResults ingredients={ingredients} />
          <FullRecipe recipeId='665573'/>
        </main>
        <footer className='bg-gray-100 p-5 mt-10 rounded-t-3xl text-xs'>
          <p>Final project for the &lt;salt/&gt; Fullstack .NET Bootcamp.</p>
          <address className='ml-2'>
            <a className='block hover:underline' href="https://github.com/omidhq/foodstack.client">FrontEnd: github.com/omidhq/foodstack.client</a>
            <a className='block hover:underline' href="https://github.com/omidhq/foodstack.api">BackEnd: github.com/omidhq/foodstack.api</a>
          </address>
        </footer>
      </div>

    </div>
  )
}

export default Home
