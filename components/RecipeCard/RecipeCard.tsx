import React from 'react'
import Image from 'next/image'
import { RecipeCardProps } from './RecipeCard.types';

export default function RecipeCard({ title, image }: RecipeCardProps) {
  return (
    <li className='border-2 rounded m-2 flex h-36'>
      <Image className='object-none' width={120} height={120} src={image} alt={title} />
      <h3 className='m-2'>{title}</h3>
    </li>
  )
}
