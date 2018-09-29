import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <div id="navbarholder">
        <Link to="/">
          <img id='borderIcon' src="https://image.flaticon.com/icons/svg/601/601939.svg" alt='app_icon'/>
        </Link>
        <NavLink to="/">
          <h3 id='navbartitle'>RESTcipe</h3>
        </NavLink>
        <Link to="/recipes">Recipe Lookup</Link>
        <Link to="/cookbook">My CookBook</Link>
      </div>
    );
  }
}
export default NavBar;
