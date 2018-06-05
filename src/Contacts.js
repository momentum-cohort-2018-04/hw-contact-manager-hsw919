/* global localStorage */

import React, { Component } from 'react'
import request from 'superagent'
import './App.css'
import Contact from './Contact'

class Contacts extends Component {
  constructor () {
    super()
    this.state = {
      array: []
    }
  }

  componentDidMount () {
    const username = this.props.username
    const password = this.props.password
    console.log(username)
    console.log(password)
    request
      .get('http://localhost:8000/contacts')
      .auth(username, password)
      .then(res => {
        this.setState({
          array: res.body
        })
      })
  }

  render () {
    return (
      <div className='Contacts'>
        <div className='container'>
          {this.state.array.map((contact, idx) => (
            <div key={idx}>
              <Contact contact={contact} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Contacts
