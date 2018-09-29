import React from 'react'

class CreateRecipe extends React.Component {

  handleSubmit = event =>{
    this.props.handleUserSubmit(event)
  }

  // componentDidMount() {
  //   fetch('http://localhost:4000/api/v1/ingredients')
  //   .then(response => response.json())
  //   .then(ingredientData => this.setState({ingredients: ingredientData}))
  // }

  render() {

    return(
      <React.Fragment>
      <form onSubmit={this.handleSubmit}>
        <label>Recipe Name</label>
        <input type='text' name='recipeName' value={this.props.recipeName} onChange={this.props.handleNewRecipe} />
        <label>Provide an Image URL</label>
        <input type='text' name='recipeUrl' value={this.props.recipeUrl} onChange={this.props.handleNewRecipe}/>
        <label>Add or Create Ingredients</label>
        <input type='text' name='ingredients' value={this.props.ingredients} onChange={this.props.handleNewRecipe}/>
        <label>Total Time(mins)</label>
        <input type='number' name='time' value={this.props.time} onChange={this.props.handleNewRecipe}/>
        <label>Servings</label>
        <input type='number' name='servings' value={this.props.servings} onChange={this.props.handleNewRecipe}/>
        <label>Description</label>
        <input type='text' name='description' value={this.props.description} onChange={this.props.handleNewRecipe}/>
        <input type='submit' />
      </form>
      </React.Fragment>
    )
  }
}
export default CreateRecipe
