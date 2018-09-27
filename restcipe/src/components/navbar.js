import React, { Component } from 'react';


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
                <img
                style={{paddingLeft: 15}}
                alt='app_icon'
                width='40'
                src="https://image.flaticon.com/icons/svg/601/601939.svg" />
              </td>
              <td width='8'/>
              <td>
                <h3>RESTcipe</h3>
              </td>
            </tr>
          </tbody>
        </table>

        <form
        style={{
          paddingLeft:15
        }}
        onSubmit={this.handleSubmit}>
        <input type='text'
          onChange={this.props.onChange}
          value={this.props.searchTerm}
          style={{
          fontSize: 10,
          display: 'block',
          width: '30%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16,


        }} placeholder="Search A Recipe" />
        <img width='35'
        onClick={this.handleSubmit}
        src={this.props.handleImageChange()} />

        </form>

      </div>
    );
  }
}

export default NavBar;
