import React from 'react'

class SearchBar extends React.Component {
  handleSubmit = (event) =>{
    event.preventDefault()
    this.props.renderDisplay()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
      <div id='search-wrapper'>
      <input
        id='search-input'
        type='text'
        onChange={this.props.onChange}
        value={this.props.searchTerm}
        placeholder="Search A Recipe">
      </input>
      <img
      alt='search-pic'
      id='search-pic'
      onClick={this.handleSubmit}
      src={this.props.handleImageChange()}/>
      </div>
      </form>
    )
  }
}
export default SearchBar
