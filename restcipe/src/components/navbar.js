import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <div id="navbarholder">
        <NavLink to="/" id='borderIcon'>
          <img src="https://image.flaticon.com/icons/svg/601/601939.svg" alt='app_icon'/>
        </NavLink>
        <h3 id='navbartitle'>RESTcipe</h3>
        <NavLink id='reclinks' to="/recipes">Recipe Lookup</NavLink>
        <NavLink id='cooklinks' to="/cookbook">My CookBook</NavLink>
      </div>
    );
  }
}
export default NavBar;
