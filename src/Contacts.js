/* global localStorage */

import React, { Component } from 'react'
import uuid from 'uuid/v4'
import request from 'superagent'
import './App.css'
import Contact from './Contact'

class Contacts extends Component {
  constructor () {
    super()
    this.state = {
      array: [],
      search: '',
      addContact: false,
      name: '',
      email: '',
      address: '',
      birthday: '',
      company: '',
      title: ''
    }
    this.search = this.search.bind(this)
    this.addContact = this.addContact.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitContact = this.submitContact.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount () {
    const updateState = this.props.clear
    request
      .get('http://localhost:8000/contacts')
      .auth(localStorage.username, localStorage.password)
      .then(res => {
        this.setState({
          array: res.body
        })
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.clear()
          updateState()
        }
      })
  }

  search (e) {
    this.setState({
      search: e.target.value
    })
  }

  addContact () {
    this.setState({
      addContact: true
    })
  }

  submitContact (e) {
    e.preventDefault()
    if (this.state.name) {
      request
        .post('http://localhost:8000/contacts')
        .auth(localStorage.username, localStorage.password)
        .send({
          id: uuid(),
          name: this.state.name
        })
        .then(res => {
          const newContact = res.body
          this.setState({
            array: this.state.array.concat(newContact)
          })
        })
      this.setState({
        addContact: false
      })
    } else {

    }
  }

  delete (e) {
    const id = e.target.name
    request
      .delete(`http://localhost:8000/contacts/${id}`)
      .auth(localStorage.username, localStorage.password)
      .then(res => {
        let deletedArray = this.state.array
        deletedArray = deletedArray.filter(contact => contact.id !== id)
        this.setState({
          array: deletedArray
        })
      })
  }

  handleChange (e) {
    const value = e.target.name
    this.setState({
      [value]: e.target.value
    })
  }

  render () {
    if (this.state.addContact === false) {
      return (
        <div className='Contacts'>
          <div className='container'>
            {/* <input type='text' onChange={this.search} /> */}
            <button onClick={this.addContact}>Add Contact</button>
            {this.state.array.map((contact, idx) => (
              <div key={idx}>
                <Contact contact={contact} delete={this.delete} />
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div className='Contacts'>
          <div className='container'>
            <form onSubmit={this.submitContact}>
              <h1>Add Contact</h1>
              <div className='input-field'>
                <label>Name(required)</label>
                <input type='text' name='name' onChange={this.handleChange} />
              </div>
              <div className='input-field'>
                <label>Email</label>
                <input type='email' name='email' onChange={this.handleChange} />
              </div>
              <div className='input-field'>
                <label>Number</label>
                <input type='tel' name='number' onChange={this.handleChange} />
              </div>
              <div className='input-field'>
                <label>Address</label>
                <input type='text' name='address' onChange={this.handleChange} />
              </div>
              <div className='input-field'>
                <label>Birthday</label>
                <input type='date' name='birthday' onChange={this.handleChange} />
              </div>
              <div className='input-field'>
                <label>Company</label>
                <input type='text' name='company' onChange={this.handleChange} />
              </div>
              <div className='input-field'>
                <label>Title</label>
                <input type='text' name='title' onChange={this.handleChange} />
              </div>
              <button type='submit'>Add</button>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default Contacts
