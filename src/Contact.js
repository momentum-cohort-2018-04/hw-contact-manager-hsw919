// /* global localStorage */

import React, { Component } from 'react'
// import request from 'superagent'
import './App.css'

class Contact extends Component {
  render () {
    const contact = this.props.contact
    return (
      <div className='Contact'>
        <h1>{contact.name}</h1>
      </div>
    )
  }
}

export default Contact
