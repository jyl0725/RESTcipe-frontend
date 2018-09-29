import React from 'react'

class UserRecipeDisplay extends React.Component {
  handleDelete = (event) => {
    this.props.handleDelete(event, this.props.recipe.id)
    console.log(this.props)
  }
  render() {
    return (
      <React.Fragment>
        <div className='display'>
          {this.props.recipe.name && <h1>{this.props.recipe.name}</h1>}
          {this.props.recipe.name && <img src={this.props.recipe.img_url} width="360" height="240" alt='food-display'/>}
          {this.props.recipe.name && <h3>Ingredients: {this.props.recipe.ingredients.map(ingredient => ingredient.name)}</h3>}
          {this.props.recipe.name && <p>Total Time: {this.props.recipe.cook_time} min</p>}
          {this.props.recipe.name && <p>Servings: {this.props.recipe.servings}</p>}
          {this.props.recipe.name && <p>Description: {this.props.recipe.directions}</p>}
          {this.props.recipe.name && <button>Edit this Recipe</button>}
          {this.props.recipe.name && <button onClick={this.handleDelete}>Delete this Recipe</button>}
        </div>
      </React.Fragment>
    )
  }
}
export default UserRecipeDisplay
