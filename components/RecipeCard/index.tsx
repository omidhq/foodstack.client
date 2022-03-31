import React from 'react'
import Image from 'next/image'
import { RecipeCardProps } from './type';

export default function RecipeCard( {title, image}:RecipeCardProps ) {
  return (
    <>
      <h3>{title}</h3>
      <Image src={image} alt={title} />
    </>
  )
}
