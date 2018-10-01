import React from 'react'

const recipeDisplay = (props) => {
  console.log(props)
  const ingredients = () => {
    return props.recipeTile.name && props.recipeTile.ingredientLines.map((ingredient, idx) =>  (<li key={idx}>{ingredient} </li>))}
  return (
    <div className='display'>
      {props.recipeTile.name && <h1>{props.recipeTile.name}</h1>}
      {props.recipeTile.name && <img src={props.recipeTile.images[0].hostedLargeUrl} width="360" height="240" alt='recipe-display'/>}
      <ul>
        {props.recipeTile.name && <h3>Ingredients:</h3>}
        {ingredients()}
      </ul>
      {props.recipeTile.name && <p>Total time: {props.recipeTile.totalTime}</p>}
      {props.recipeTile.name && <p>Servings: {props.recipeTile.numberOfServings}</p>}
      {props.recipeTile.name && <a href={props.recipeTile.source.sourceRecipeUrl}>Directions</a>}
    </div>
  )
}
export default recipeDisplay
