import React from 'react'

const AllUserRecipes = (props) => {
  return (
    <div onClick={event => props.handleUserRecipe(event, props)}>
      {props.name}
    </div>
  )
}
export default AllUserRecipes
