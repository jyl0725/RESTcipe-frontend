import React, { Component } from 'react';


class NavBar extends Component {

  handleSubmit = (event) =>{
    event.preventDefault()
    this.props.renderDisplay()
  }
  render() {
    return (
      <div className="App">
        <table className='titleBar'>
          <tbody>
            <tr>
              <td>
                <img
                alt='app_icon'
                width='100'
                src="https://raw.githubusercontent.com/themoviedbcontent/imgs/master/logo-tmdb.png" />
              </td>
              <td width='8'/>
              <td>
                <h3>RESTcipe</h3>
              </td>
            </tr>
          </tbody>
        </table>

        <form onSubmit={this.handleSubmit}>
        <input type='text'
          onChange={this.props.onChange}
          value={this.props.searchTerm}
          style={{
          fontSize: 20,
          display: 'block',
          width: '99%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} placeholder="Enter Search" />
        <input type='submit'/>
        </form>

      </div>
    );
  }
}

export default NavBar;
