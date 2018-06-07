/* global localStorage */

import React, { Component } from 'react'
// import request from 'superagent'
import './App.css'

class Login extends Component {
  constructor () {
    super()
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleUsername (e) {
    localStorage.username = e.target.value
  }

  handlePassword (e) {
    localStorage.password = e.target.value
  }

  render () {
    let updateState = this.props.submit
    return (
      <div className='Login'>
        <form id='submit' onSubmit={updateState}>
          <div className='input-field'>
            <label>Username</label>
            <input type='text' onChange={this.handleUsername} />
          </div>
          <div className='input-field'>
            <label>Password</label>
            <input type='password' onChange={this.handlePassword} />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

export default Login

// class Login extends Component {
//   constructor () {
//     super()
//     this.handleUsername = this.handleUsername.bind(this)
//     this.handlePassword = this.handlePassword.bind(this)
//     this.auth = this.auth.bind(this)
//   }

//   auth (e) {
//     e.preventDefault()
//   }

//   handleUsername (e) {
//     localStorage.username = e.target.value
//   }

//   handlePassword (e) {
//     localStorage.password = e.target.value
//   }

//   render () {
//     return (
// <div className='Login'>
//   <form id='submit' onSubmit={this.auth}>
//     <div className='input-field'>
//       <label>Username</label>
//       <input type='text' onChange={this.handleUsername} />
//     </div>
//     <div className='input-field'>
//       <label>Password</label>
//       <input type='password' onChange={this.handlePassword} />
//     </div>
//     <button type='submit'>Login</button>
//   </form>
// </div>
//     )
//   }
// }

// export default Login
