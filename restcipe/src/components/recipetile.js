import React from 'react'

const RecipeTile = (props) => {
  return (
    <div onClick={(event) => props.handleTileClick(event, props)}>{props.recipeName}</div>
  )
}
export default RecipeTile
