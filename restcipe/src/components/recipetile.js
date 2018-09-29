import React from 'react'

const RecipeTile = (props) => {
  return (
    <p className='recipeTile' onClick={(event) => props.handleTileClick(event, props)}>{props.recipeName}</p>
  )
}
export default RecipeTile
