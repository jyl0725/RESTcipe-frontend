import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount(){
    fetch('http://api.yummly.com/v1/api/recipes?_app_id=5241297e&_app_key=da685b63b4224d756256092ab4ec5b4e&q=onion+soup&requirePictures=true')
    .then(res => res.json())
    .then(recipes => console.log(recipes))
  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
