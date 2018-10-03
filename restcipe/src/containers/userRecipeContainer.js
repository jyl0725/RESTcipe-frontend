import React from 'react'
import AllUserRecipes from '../components/allUserRecipes'
import UserRecipeDisplay from '../components/userRecipeDisplay'
import { NavLink } from 'react-router-dom'
import CreateRecipe from '../components/createRecipe'



class UserRecipeContainer extends React.Component {
  state = {
    recipes : [],
    recipeDisplay: {},
    name: '',
    img_url: '',
    ingredients: '',
    cook_time: 0,
    servings: 0,
    directions: '',
    allIngredients: []

  }

  handleNewRecipe = (event) =>{
    this.setState({[event.target.name] :event.target.value})
  }

  handleUserSubmit = (event) =>{
    event.preventDefault();
    // this.fetchPostRecipe().then(this.fetchPostIngredient()).then(this.fetchPostRecipeIngredient())
    this.fetchPostRecipe()

    // this.fetchAllRequest();
  }

  // async handleUserSubmit(event){
  //   event.preventDefault();
  //   const recipe = await fetchPostRecipe();
  //   const ingredients = await fetchPostIngredient();
  //   const recipeIngredient = await fetchPostRecipeIngredient();
  //
  // }
  //
  // fetchAllRequest = () =>{
  //   fetch('http://localhost:4000/api/v1/recipes', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({'name': this.state.name, 'cook_time': this.state.cook_time,
  //     'servings': this.state.servings, 'directions': this.state.directions, "img_url":this.state.img_url})
  //   })
  //   .then(res => res.json())
  //   .then(data => this.setState({recipes: [...this.state.recipes, data]}))
  //   .then(() =>{
  //     const ingredientsName = this.state.allIngredients.map(ingred => ingred.name.toLowerCase())
  //     const newIngred = this.state.ingredients.split(" ").filter(ingred =>{
  //       return !ingredientsName.includes(ingred.toLowerCase())
  //     })
  //     debugger
  //     newIngred.forEach(ingred =>{
  //       fetch('http://localhost:4000/api/v1/ingredients', {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({'name': `${ingred}`})
  //       })
  //       .then(res => res.json())
  //       .then(data => this.setState({allIngredients: [...this.state.allIngredients, data]}))
  //       // , this.fetchPostRecipeIngredient(data)
  //     })
  //       debugger
  //   })
  //   .then(() =>{
  //     const recIngre = this.state.ingredients.split(" ")
  //     const needPostRecIng = this.state.allIngredients.filter(ingred => recIngre.includes(ingred.name))
  //       debugger
  //     needPostRecIng.forEach(ing =>{
  //       fetch('http://localhost:4000/api/v1/recipe_ingredients', {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({"recipe_id": this.state.recipes[this.state.recipes.length - 1].id, "ingredient_id": ing.id})
  //       })
  //       .then(res => res.json())
  //       .then(ri => this.state.recipes[this.state.recipes.length - 1].ingredients.concat([ri]))
  //     })
  //   })
  // }


  fetchPostRecipe = () =>{
    fetch('http://localhost:4000/api/v1/recipes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': this.state.name, 'cook_time': this.state.cook_time,
      'servings': this.state.servings, 'directions': this.state.directions, "img_url":this.state.img_url})
    })
    .then(res => res.json())
    .then(data => this.setState({recipes: [...this.state.recipes, data]}))
    .then(() =>{this.fetchPostIngredient()})
    .then(() => this.fetchPostRecipeIngredient())
  }

  fetchPostIngredient = () =>{
    const ingredientsName = this.state.allIngredients.map(ingred => ingred.name.toLowerCase())
    const newIngred = this.state.ingredients.split(" ").filter(ingred =>{
      return !ingredientsName.includes(ingred.toLowerCase())
    })
    // const IngredWithId = this.state.ingredients.split(" ").filter(ingred =>{
    //   return ingredientsName.includes(ingred.toLowerCase())
    // })

    // IngredWithId.forEach(ingred =>{
    //   fetch('http://localhost:4000/api/v1/recipe_ingredients', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({"recipe_id": this.state.recipes[this.state.recipes.length - 1].id, "ingredient_id": ingred.id})
    //   })
    //   .then(res => res.json())
    //   .then(data => this.setState({allIngredients: [...this.state.allIngredients, data]}))
    // })

    newIngred.forEach(ingred =>{
      fetch('http://localhost:4000/api/v1/ingredients', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': `${ingred}`})
      })
      .then(res => res.json())
      .then(data => this.setState({allIngredients: [...this.state.allIngredients, data]},this.fetchPostOldRecipeIngredient(data)))
      // , this.fetchPostRecipeIngredient(data)

    })
  }

  fetchPostOldRecipeIngredient = (data) => {
    console.log(this.state.recipes[this.state.recipes.length - 1].id)

    fetch('http://localhost:4000/api/v1/recipe_ingredients', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"recipe_id": this.state.recipes[this.state.recipes.length - 1].id , "ingredient_id": data.id})
      })
      .then(res => res.json())
      .then(ri =>{
        let newRep = [...this.state.recipes]
        let rep = newRep.find(rep => rep.id === ri.recipe_id)
        rep.ingredients.push(data)
        this.setState({recipes: newRep})
      } )
    }

  // this.state.recipes[this.state.recipes.length - 1].ingredients.concat([ri])

  // fetchPost = async () => {
  //   await this.fetchPostIngredient()
  //
  //   await this.fetchPostRecipe()
  //
  //   await this.fetchPostRecipeIngredient()
  //
  // }

  fetchPostRecipeIngredient = () => {
    //
    // const ingredientsName = this.state.allIngredients.map(ingred => ingred.name.toLowerCase())
    const recIngre = this.state.ingredients.split(" ")
    const needPostRecIng = this.state.allIngredients.filter(ingred => recIngre.includes(ingred.name))

    needPostRecIng.forEach(ing =>{
      fetch('http://localhost:4000/api/v1/recipe_ingredients', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"recipe_id": this.state.recipes[this.state.recipes.length - 1].id, "ingredient_id": ing.id})
      })
      .then(res => res.json())
      .then(ri => {
        let newRep = [...this.state.recipes]
        let rep = newRep.find(rep => rep.id === ri.recipe_id)
        rep.ingredients.push(ing)
        this.setState({recipes: newRep})
      })

    })
  }


      // fetch('http://localhost:4000/api/v1/recipe_ingredients', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({"recipe_id": this.state.recipes[this.state.recipes.length - 1].id, "ingredient_id": data.id})
      // })
      // .then(res => res.json())
      // .then(recIng => {
      //   console.log(this.state.recipes[this.state.recipes.length - 1].ingredients.concat(recIng))
      // })

    // let recipeIngredient = this.state.ingredients.split(" ")
    // const repIngredWithId = this.state.allIngredients.filter(ingred => recipeIngredient.includes(ingred.name.toLowerCase()))
    //
    // repIngredWithId.forEach(ingred =>{
    //   fetch('http://localhost:4000/api/v1/recipe_ingredients', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({"recipe_id": this.state.recipes[this.state.recipes.length - 1].id, "ingredient_id": ingred.id})
    //   })
    // })


  //
  //
  // fetchPostIngredient = () =>{
  //   const ingredientsName = this.state.allIngredients.map(ingred => ingred.name.toLowerCase())
  //   const newIngred = this.state.createdRecipe.ingredients.filter(ingred =>{
  //   return !ingredientsName.includes(ingred.toLowerCase())})
  //
  //     newIngred.forEach(ingred =>{
  //     fetch('http://localhost:4000/api/v1/ingredients', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({'name': `${ingred}`})
  //     })
  //     .then(() =>{
  //       fetch('http://localhost:4000/api/v1/ingredients')
  //       .then(response => response.json())
  //       .then(data => this.setState({allIngredients: data}))
  //       .then(() => this.fetchPostRecipeIngredient())
  //     })
  //   })
  //   }
  //
  //
  //   fetchPostRecipe = () =>{
  //
  //     fetch('http://localhost:4000/api/v1/recipes', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({'name': this.state.createdRecipe.name, 'cook_time': this.state.createdRecipe.time,
  //       'servings': this.state.createdRecipe.servings, 'directions': this.state.createdRecipe.directions, "img_url":this.state.createdRecipe.img_url
  //     })
  //   })
  //   .then(() =>{
  //     fetch('http://localhost:4000/api/v1/recipes')
  //     .then(response => response.json())
  //     .then(data => this.setState({recipes: data}))
  //   })
  //   .then(() => this.fetchPostIngredient())
  // }
  //
  // fetchPostRecipeIngredient = () =>{
  //
  //   const recipeIngred =  this.state.allIngredients.filter(ingred => {return this.state.createdRecipe.ingredients.includes(ingred.name.toLowerCase())})
  //   // debugger
  //   recipeIngred.forEach( ingred => {
  //     fetch('http://localhost:4000/api/v1/recipe_ingredients', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({"recipe_id": this.state.recipes[this.state.recipes.length - 1].id, "ingredient_id": ingred.id})
  //     })
  //   })
  //
  //     fetch('http://localhost:4000/api/v1/recipes')
  //     .then(response => response.json())
  //     .then(data => this.setState({recipes: data}))
  // }

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
    return (
      <div id='userrecipescontainer'>
      <img className='recipescontainerimg' src='https://images.unsplash.com/photo-1507248783228-90ad12a3e52c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6b4ee9a8658c15bfae522aba7246fa09&auto=format&fit=crop&w=1050&q=80'/>
      <h3 className='linkdisplay'>My Recipes</h3>
        {this.renderAllRecipesDisplay()}
        <UserRecipeDisplay
          handleDelete={this.handleDelete}
          recipe={this.state.recipeDisplay}/>
        <CreateRecipe
          recipeName={this.state.name}
          recipeUrl={this.state.img_url}
          ingredients={this.state.ingredients}
          time={this.state.cook_time}
          servings={this.state.servings}
          description={this.state.directions}
          handleNewRecipe={this.handleNewRecipe}
          handleUserSubmit={this.handleUserSubmit}/>
      </div>
    )
  }
}
export default UserRecipeContainer
