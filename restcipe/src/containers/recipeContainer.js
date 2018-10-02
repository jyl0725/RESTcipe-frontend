import React from 'react'
import RecipeTile from '../components/recipetile'
import RecipeDisplay from '../components/recipeDisplay'
import SearchBar from '../components/searchBar'
const API_KEY = process.env.REACT_APP_API_KEY

class RecipeContainer extends React.Component {
  state = {
    recipes: [],
    searchTerm: '',
    recipeTile: {}
  }

  handleImageChange = () => {
   if(this.state.searchTerm.includes('hamburger'))
     {return 'https://image.flaticon.com/icons/svg/1148/1148277.svg'}
   else if (this.state.searchTerm.includes('pizza'))
     {return 'https://image.flaticon.com/icons/svg/1149/1149845.svg'}
   else if (this.state.searchTerm.includes('pasta'))
     {return 'https://image.flaticon.com/icons/svg/135/135744.svg'}
   else if (this.state.searchTerm.includes('taco'))
     {return 'https://image.flaticon.com/icons/svg/135/135590.svg'}
   else
     {return 'https://image.flaticon.com/icons/svg/1135/1135479.svg'}
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
     })
   )}

  render() {
    return (
      <div className='containers'>

      <SearchBar
        renderDisplay={this.renderDisplay}
        handleImageChange={this.handleImageChange}
        onChange={this.handleChange}
        searchTerm={this.props.searchTerm}/>
        <div className='grid'>
          {this.state.recipes.map(recipe => {
            return <RecipeTile handleTileClick={this.handleTileClick} key={recipe.id} {...recipe}/>})}
        </div>
        <RecipeDisplay recipeTile={this.state.recipeTile}/>

      </div>

    )
  }
}
export default RecipeContainer
