// /* global localStorage */

import React, { Component } from 'react'
// import request from 'superagent'
import './App.css'
// import { request } from 'https';

class Contact extends Component {
  render () {
    const deleteContact = this.props.delete
    const editContact = this.props.edit
    const contact = this.props.contact
    return (
      <div className='Contact'>
        <h1>{contact.name}</h1>
        <h2>{contact.email}</h2>
        <h3>{contact.address}</h3>
        <button className='button-danger' onClick={deleteContact} name={contact.id} >Delete</button>
        <button onClick={editContact} name={contact.id}>Edit</button>
      </div>
    )
  }
}

export default Contact
