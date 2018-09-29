import React from 'react'
import AllUserRecipes from '../components/allUserRecipes'
import UserRecipeDisplay from '../components/userRecipeDisplay'
import { NavLink } from 'react-router-dom'

class UserRecipeContainer extends React.Component {
  state = {
    recipes : [],
    recipeDisplay: {}
  }

  handleDelete = (event, id) => {
    fetch(`http://localhost:4000/api/v1/recipes/${id}`, { method: "DELETE" })
    .then(() => {
      this.setState((prevState) => {
        return {
          recipes: prevState.recipes.filter(recipe => recipe.id !== id),
          recipeDisplay: ''
        }
      })
    })
    .then(() => console.log(this.state))
  }

  renderAllRecipesDisplay = () => {
    return this.state.recipes.map(recipe => {
       return <AllUserRecipes key={recipe.id} {...recipe} handleUserRecipe={this.handleUserRecipe} />
    })
  }

  handleUserRecipe = (event, props) =>{
    event.stopPropagation()
    const recipe = this.state.recipes.find(recipe => recipe.name === event.target.innerText)
    this.setState({recipeDisplay: recipe})
  }

  componentDidMount(){
    fetch('http://localhost:4000/api/v1/recipes')
    .then(response => response.json())
    .then(data => this.setState({recipes: data}))
  }

  render() {
    return (
      <div>
      <NavLink to='/cookbook/create'>
        <button>Create A Recipe</button>
      </NavLink>
      <h3>My Recipes</h3>
        {this.renderAllRecipesDisplay()}
        <UserRecipeDisplay handleDelete={this.handleDelete} recipe={this.state.recipeDisplay}/>
      </div>
    )
  }
}
export default UserRecipeContainer
