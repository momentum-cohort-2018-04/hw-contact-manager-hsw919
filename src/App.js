/* global localStorage */

import React, { Component } from 'react'
// import request from 'superagent'
import './App.css'
import Login from './Login'
import Contacts from './Contacts'

class App extends Component {
  constructor () {
    super()
    this.state = {
      username: localStorage.username,
      password: localStorage.password
    }

    this.submit = this.submit.bind(this)
  }

  submit (e) {
    e.preventDefault()
    this.setState({
      username: localStorage.username,
      password: localStorage.password
    })
  }

  render () {
    if (this.state.username && this.state.password) {
      return (
        <div className='App'>
          <div className='container'>
            <Contacts username={this.state.username} password={this.state.password} />
          </div>
        </div>
      )
    } else {
      return (
        <div className='App'>
          <div className='container'>
            <Login submit={this.submit} />
          </div>
        </div>
      )
    }
  }
}

export default App

// class App extends Component {
//   constructor () {
//     super()
//     this.state = {
//       username: localStorage.username,
//       password: localStorage.password
//     }

//     this.handleUsername = this.handleUsername.bind(this)
//     this.handlePassword = this.handlePassword.bind(this)
//     this.auth = this.auth.bind(this)
//     this.clearStorage = this.clearStorage.bind(this)
//   }

//   auth (e) {
//     e.preventDefault()
//     this.setState({
//       username: localStorage.username,
//       password: localStorage.password
//     })
//     request
//       .get('http://localhost:8000/contacts')
//       .auth('hunter', 'hi')
//       .then(res => {
//         console.log(res)
//       })
//   }

//   clearStorage () {
//     localStorage.clear()
//     this.setState({
//       username: localStorage.username,
//       password: localStorage.password
//     })
//   }

//   handleUsername (e) {
//     localStorage.username = e.target.value
//   }

//   handlePassword (e) {
//     localStorage.password = e.target.value
//   }

//   render () {
//     if (this.state.username && this.state.password) {
//       return (
//         <div className='App'>
//           <div className='container'>
//             <button onClick={this.clearStorage}>clear</button>
//           </div>
//         </div>
//       )
//     } else {
//       return (
//         <div className='App'>
//           <div className='container'>
//             {/* <Login /> */}
//             <form id='submit' onSubmit={this.auth}>
//               <div className='input-field'>
//                 <label>Username</label>
//                 <input type='text' onChange={this.handleUsername} />
//               </div>
//               <div className='input-field'>
//                 <label>Password</label>
//                 <input type='password' onChange={this.handlePassword} />
//               </div>
//               <button type='submit'>Login</button>
//             </form>
//           </div>
//         </div>
//       )
//     }
//   }
// }

// export default App
