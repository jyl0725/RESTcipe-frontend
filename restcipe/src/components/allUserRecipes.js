import React from 'react'

const AllUserRecipes = (props) => {
  // console.log(props)
  // {props.cook_time}
  // {props.servings}
  // {props.directions}
  // {props.ingredients.map(ingredient => ingredient.name)}
  // {props.img_url}
    return (
      <div onClick={event => props.handleUserRecipe(event, props)}>
      {props.name}
      </div>
    )
}

export default AllUserRecipes
