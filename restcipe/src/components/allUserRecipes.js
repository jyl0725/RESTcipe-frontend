import React from 'react'

const AllUserRecipes = (props) => {
  return (
    <div className='alluserrecipes' onClick={event => props.handleUserRecipe(event, props)}>
      {props.name}
    </div>
  )
}
export default AllUserRecipes
