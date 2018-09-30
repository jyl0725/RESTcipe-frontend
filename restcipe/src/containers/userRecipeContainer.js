import React from 'react'
import AllUserRecipes from '../components/allUserRecipes'
import UserRecipeDisplay from '../components/userRecipeDisplay'
import { NavLink } from 'react-router-dom'
import CreateRecipe from '../components/createRecipe'

class UserRecipeContainer extends React.Component {
  state = {
    recipes : [],
    recipeDisplay: {},
    createdRecipe: {
      recipeName: '',
       recipeUrl: '',
       ingredients: [],
       time: 0,
       servings: 0,
       description: ''
    },
    recipeName: '',
    recipeUrl: '',
    ingredients: '',
    time: 0,
    servings: 0,
    description: '',
    allIngredients: []

  }

  handleNewRecipe = (event) =>{
    this.setState({[event.target.name] :event.target.value})
  }

  handleUserSubmit = (event) =>{
    event.preventDefault();
    this.setState({
      createdRecipe: {
        recipeName: this.state.recipeName,
         recipeUrl: this.state.recipeUrl,
         ingredients: this.state.ingredients.split(" "),
         time: this.state.time,
         servings: this.state.servings,
         description: this.state.description
       }
     },this.fetchPostIngredient())
  }



  fetchPostIngredient = () =>{
    const ingredientsName = this.state.allIngredients.map(ingred => ingred.name.toLowerCase())

     return this.state.createdRecipe.ingredients.filter(ingred =>{
     return !ingredientsName.includes(ingred.toLowerCase())}).forEach(ingred =>{
      fetch('http://localhost:4000/api/v1/ingredients', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': `${ingred}`, "recipes":['grain','food']})})
        // .then(this.set((prevState =>{})))
      })
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
  }

  renderAllRecipesDisplay = () => {
    return this.state.recipes.map(recipe => {
       return <AllUserRecipes  key={recipe.id}{...recipe} handleUserRecipe={this.handleUserRecipe} />
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

    fetch('http://localhost:4000/api/v1/ingredients')
    .then(response => response.json())
    .then(data => this.setState({allIngredients: data}))
  }

  render() {
    return (
      <div>
      <NavLink to='/cookbook/create'>
        <button>Create A Recipe</button>
      </NavLink>
      <h3>My Recipes</h3>
        {this.renderAllRecipesDisplay()}
        <UserRecipeDisplay
          handleDelete={this.handleDelete}
          recipe={this.state.recipeDisplay}/>
        <CreateRecipe
          recipeName={this.state.recipeName}
          recipeUrl={this.state.recipeUrl}
          ingredients={this.state.ingredients}
          time={this.state.time}
          servings={this.state.servings}
          description={this.state.description}
          handleNewRecipe={this.handleNewRecipe}
          handleUserSubmit={this.handleUserSubmit}/>
      </div>
    )
  }
}
export default UserRecipeContainer
