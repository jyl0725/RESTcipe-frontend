import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class NavBar extends Component {

  handleSubmit = (event) =>{
    event.preventDefault()
    this.props.renderDisplay()
  }
  render() {
    return (
      <div className="App">
        <table
        style={{
          background: '#54c57a',
          width: '100%'
        }} className='titleBar'>
          <tbody>
            <tr>
              <td>
              <Link to="/">
                <img
                align='left'
                style={{paddingLeft: 15, paddingTop: 10}}
                alt='app_icon'
                width='40'
                src="https://image.flaticon.com/icons/svg/601/601939.svg" />
                </Link>
                <h3
                id='navbartitle'
                align='left'
                style={{paddingLeft:70}}>RESTcipe
                </h3>
              </td>
              <td width='8'/>
              <td >
              </td>
            </tr>
          </tbody>
        </table>

        <div className='search2'
          onSubmit={this.handleSubmit}>
          <form className="form">
        <input
          id='searchbar'
          type='text'
          onChange={this.props.onChange}
          value={this.props.searchTerm}
          placeholder="Search A Recipe"
          style={{
          fontSize: 12,
          display: 'block',
          width: '100%',
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 16,
          }}
           ></input>
        <img
        alt='broccoli-submit'
        id='submitpic'
        width='35'
        onClick={this.handleSubmit}
        src={this.props.handleImageChange()} />
        </form>
        </div>

      </div>
    );
  }
}

export default NavBar;
