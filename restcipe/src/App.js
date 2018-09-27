import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home'
import NavBar from './components/navbar'
import RecipeContainer from './containers/recipeContainer.js'


const URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/classify'
const API_KEY = process.env.REACT_APP_API_KEY
class App extends Component {
  state = {
    recipes: [],
    searchTerm: '',
    recipeTile: {}
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  renderDisplay = () => {
    this.setState({searchTerm: this.state.searchTerm.split(" ").join('+')})
fetch(`http://api.yummly.com/v1/api/recipes?_app_id=5241297e&_app_key=${API_KEY}&q=${this.state.searchTerm}&requirePictures=true&maxResult=20`)
   .then(res => res.json())
   .then(recipes => this.setState({recipes: recipes.matches},console.log(this.state.recipes)))
 }


 handleTileClick = (event, tile) => {

     fetch(`http://api.yummly.com/v1/api/recipe/${tile.id}?_app_id=5241297e&_app_key=${API_KEY}`)
     .then(response => response.json())
     .then(data => this.setState({
       recipeTile: data
     }))

 }

  render() {
    console.log(process.env)
    console.log(this.state.recipeTile)
    return (
      <div>
        <Router>
          <React.Fragment>
            <NavBar searchTerm={this.state.searchTerm} onChange={this.handleChange} renderDisplay={this.renderDisplay}/>
            <Route exact path="/" render={Home} />
          </React.Fragment>
        </Router>
        <RecipeContainer handleTileClick={this.handleTileClick} recipes={this.state.recipes} recipeTile={this.state.recipeTile} />
      </div>
    );
  }
}

export default App;
