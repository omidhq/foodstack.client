export interface FullRecipeProp {
  //cb: Function
  recipeId: string
}

export interface OtherIngredient{
  name?: string
  original?: string
}

interface Step {
  step?: string
}

export interface Steps {
  name?: string
  steps?: Step[]
}