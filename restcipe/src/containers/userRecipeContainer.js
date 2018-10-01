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
      name: '',
      img_url: '',
      ingredients: [],
      cook_time: 0,
      servings: 0,
      directions: ''
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
        name: this.state.recipeName,
         img_url: this.state.recipeUrl,
         ingredients: this.state.ingredients.split(" "),
         cook_time: this.state.time,
         servings: this.state.servings,
         directions: this.state.description
       }
     }, () => {this.fetchPostRecipe()})

  }



  fetchPostIngredient = () =>{
    const ingredientsName = this.state.allIngredients.map(ingred => ingred.name.toLowerCase())
    const newIngred = this.state.createdRecipe.ingredients.filter(ingred =>{
    return !ingredientsName.includes(ingred.toLowerCase())})

      newIngred.forEach(ingred =>{
      fetch('http://localhost:4000/api/v1/ingredients', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': `${ingred}`})
      })
      .then(() =>{
        fetch('http://localhost:4000/api/v1/ingredients')
        .then(response => response.json())
        .then(data => this.setState({allIngredients: data}))
        .then(() => this.fetchPostRecipeIngredient())
      })
    })
    }


    fetchPostRecipe = () =>{

      fetch('http://localhost:4000/api/v1/recipes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': this.state.createdRecipe.name, 'cook_time': this.state.createdRecipe.time,
        'servings': this.state.createdRecipe.servings, 'directions': this.state.createdRecipe.directions, "img_url":this.state.createdRecipe.img_url
      })
    })
    .then(() =>{
      fetch('http://localhost:4000/api/v1/recipes')
      .then(response => response.json())
      .then(data => this.setState({recipes: data}))
    })
    .then(() => this.fetchPostIngredient())
  }

  fetchPostRecipeIngredient = () =>{

    const recipeIngred =  this.state.allIngredients.filter(ingred => {return this.state.createdRecipe.ingredients.includes(ingred.name.toLowerCase())})
    // debugger
    recipeIngred.forEach( ingred => {
      fetch('http://localhost:4000/api/v1/recipe_ingredients', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"recipe_id": this.state.recipes[this.state.recipes.length - 1].id, "ingredient_id": ingred.id})
      })
    })

      fetch('http://localhost:4000/api/v1/recipes')
      .then(response => response.json())
      .then(data => this.setState({recipes: data}))
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
       return <AllUserRecipes  key={recipe.id} {...recipe} handleUserRecipe={this.handleUserRecipe} />
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
    console.log(this.state.recipes)
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
