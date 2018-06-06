// /* global localStorage */

import React, { Component } from 'react'
// import request from 'superagent'
import './App.css'
// import { request } from 'https';

class Contact extends Component {
  render () {
    const deleteContact = this.props.delete
    const contact = this.props.contact
    return (
      <div className='Contact'>
        <h1>{contact.name}</h1>
        <button className='button-danger' onClick={deleteContact} name={contact.id} >Delete</button>
      </div>
    )
  }
}

export default Contact
