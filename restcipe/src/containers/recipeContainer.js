import React from 'react'
import RecipeTile from '../components/recipetile'
import RecipeDisplay from '../components/recipeDisplay'

class RecipeContainer extends React.Component {

  render() {
    // console.log(this.props.recipes)
    return (
      <div>
      <div className='grid'>
          {this.props.recipes.map(recipe => {
            return <RecipeTile handleTileClick={this.props.handleTileClick} key={recipe.id} {...recipe} />
          })}
      </div>
      <RecipeDisplay  recipeTile={this.props.recipeTile}/>
      </div>

    )
  }
}

export default RecipeContainer
