import React from 'react'

const RecipeTile = (props) => {
  return (
    <div className='recipeTile' onClick={(event) => props.handleTileClick(event, props)}>{props.recipeName}</div>
  )
}
export default RecipeTile
