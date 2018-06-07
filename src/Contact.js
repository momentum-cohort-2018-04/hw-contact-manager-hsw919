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
        <h1 className='contact-name'>{contact.name}</h1>
        <h5><span>Email: </span>{contact.email}</h5>
        <h5><span>Number: </span>{contact.number}</h5>
        <h5><span>Address: </span>{contact.address}</h5>
        <h5><span>Birthday: </span>{contact.birthday}</h5>
        <h5><span>Company: </span>{contact.company}</h5>
        <h5 className='last'><span>Title: </span>{contact.title}</h5>
        <button className='button-danger' onClick={deleteContact} name={contact.id} >Delete</button>
        <button onClick={editContact} name={contact.id}>Edit</button>
      </div>
    )
  }
}

export default Contact
