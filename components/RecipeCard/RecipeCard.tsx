import React from 'react'
import Image from 'next/image'
import { RecipeCardProps } from './RecipeCard.types';

export default function RecipeCard({ title, image }: RecipeCardProps) {
  return (
    <li className='border-2 border-blue-200 rounded mb-4 px-4 flex min'>
      <figure className='w-44 flex-none'>
        <Image layout="responsive" objectFit="contain" width="100%" height="100%" src={image} alt={title} />
      </figure>
      <div className='px-3 pt-5 flex-initial flex flex-col'>
        <h3 className='font-bold leading-normal pb-2'>{title}</h3>
        <p className='pb-2'>Treat yourself to these easy cupcakes with a caramel-flavoured sponge and salted caramel topping. Perfect for afternoon tea.</p>
        <a className='text-sm p-1 mb-3 border rounded border-gray-400 border-solid bg-blue-100 to-blue-500 block max-w-fit align-self-end' href='#'>Full Recipe</a>
      </div>
    </li>
  )
}
