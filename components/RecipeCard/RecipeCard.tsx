import React from 'react'
import Image from 'next/image'
import { RecipeCardProps } from './RecipeCard.types';

export default function RecipeCard({ title, image }: RecipeCardProps) {
  return (
    <li>
      <h3>{title}</h3>
      <Image width={200} height={100} src={image} alt={title} />
    </li>
  )
}
