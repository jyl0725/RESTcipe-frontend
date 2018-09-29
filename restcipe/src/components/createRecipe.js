import React from 'react'

class CreateRecipe extends React.Component {
  state = {ingredients: []}

  componentDidMount() {
    fetch('http://localhost:4000/api/v1/ingredients')
    .then(response => response.json())
    .then(ingredientData => this.setState({ingredients: ingredientData}))
  }

  render() {
    console.log(this.state.ingredients)
    return(
      <React.Fragment>
      <form>
        <label>Recipe Name</label>
        <input type='text' name='recipeName'/>
        <label>Provide an Image URL</label>
        <input type='text' name='url'/>
        <label>Add or Create Ingredients</label>
        <input type='text' name='ingredients'/>
        <label>Total Time(mins)</label>
        <input type='number' name='time'/>
        <label>Servings</label>
        <input type='number' name='servings'/>
        <label>Description</label>
        <input type='text' name='description'/>
      </form>
      </React.Fragment>
    )
  }
}
export default CreateRecipe
