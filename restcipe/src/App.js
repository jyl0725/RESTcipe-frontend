import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home'
import NavBar from './components/navbar'
import RecipeContainer from './containers/recipeContainer.js'
import UserRecipeContainer from './containers/userRecipeContainer'
import CreateRecipe from './components/createRecipe'

class App extends Component {


  render() {
    return (

        <Router>
          <React.Fragment>
            <NavBar />
            <Route exact path="/" render={Home}/>
            <Route exact path="/recipes" component={RecipeContainer}/>
            <Route exact path="/cookbook" component={UserRecipeContainer}/>
            <Route exact path="/cookbook/create" component={CreateRecipe}/>
          </React.Fragment>
        </Router>

    );
  }
}
export default App;
