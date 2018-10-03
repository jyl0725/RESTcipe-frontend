import React from 'react'

class UserRecipeDisplay extends React.Component {
  handleDelete = (event) => {
    this.props.handleDelete(event, this.props.recipe.id)
  }

  handleIngredient = () =>{
    return this.props.recipe.ingredients.map(ing => (<div key={ing.id}>  {ing.name}  </div>))
  }

  render() {
    return (

        <div className='recipe-tile-display'>
          {this.props.recipe.name && <h1 >{this.props.recipe.name}</h1>}
          {this.props.recipe.name && <img className='fooddisplay' src={this.props.recipe.img_url} width="360" height="240" alt='food-display'/>}
          {this.props.recipe.name && <h3>Ingredients: {this.handleIngredient()}</h3>}
          {this.props.recipe.name && <p>Total Time: {this.props.recipe.cook_time} min</p>}
          {this.props.recipe.name && <p>Servings: {this.props.recipe.servings}</p>}
          {this.props.recipe.name && <p>Description: {this.props.recipe.directions}</p>}
          {this.props.recipe.name && <button>Edit this Recipe</button>}
          {this.props.recipe.name && <button onClick={this.handleDelete}>Delete this Recipe</button>}
        </div>

    )
  }
}
export default UserRecipeDisplay
