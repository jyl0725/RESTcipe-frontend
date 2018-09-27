import React from 'react'

const recipeDisplay = (props) =>{
  console.log(props.recipeTile.ingredients)



  const ingredients = () => {
    return props.recipeTile.name && props.recipeTile.ingredientLines.map((ingredient, idx) =>  (<li key={idx}>{ingredient} </li>))
  }
  return (
    <div>
    {props.recipeTile.name && <h1>{props.recipeTile.name}</h1>}
    {props.recipeTile.name && <img src={props.recipeTile.images[0].hostedLargeUrl} width="360" height="240"/>}
    <ul>
    {props.recipeTile.name && <h3>Ingredients:</h3>}
    {ingredients()}
    </ul>
    {props.recipeTile.name && <div>Total time: {props.recipeTile.totalTime}</div>}
    {props.recipeTile.name && <div>Servings: {props.recipeTile.numberOfServings}</div>}
    {props.recipeTile.name && <a href={props.recipeTile.source.sourceRecipeUrl}>Directions</a>}
    </div>
  )
}

// {props.recipeTile.smallImageUrls && <img src={props.recipeTile.smallImageUrls[0]} width="200" height="200" />}
//  {props.recipeTile.smallImageUrls && props.recipeTile.rating}
//  <ul>
//  {props.recipeTile.smallImageUrls && ingredients()}
//  </ul>
export default recipeDisplay
