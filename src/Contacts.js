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
      editContact: false,
      editName: '',
      editEmail: '',
      editAddress: '',
      editBirthday: '',
      editCompany: '',
      editTitle: '',
      editId: '',
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
    this.edit = this.edit.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
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
          name: this.state.name,
          email: this.state.email,
          number: this.state.number,
          address: this.state.address,
          birthday: this.state.birthday,
          company: this.state.company,
          title: this.state.title
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

  edit (e) {
    this.setState({
      editContact: true
    })
    this.state.array.map((contact) => {
      if (e.target.name === contact.id) {
        this.setState({
          editName: contact.name,
          editEmail: contact.email,
          editNumber: contact.number,
          editAddress: contact.address,
          editBirthday: contact.birthday,
          editCompany: contact.company,
          editTitle: contact.title,
          editId: contact.id
        })
      }
    })
  }

  submitEdit (e) {
    e.preventDefault()
    const body = {
      id: this.state.editId,
      name: this.state.editName,
      email: this.state.editEmail,
      number: this.state.editNumber,
      address: this.state.editAddress,
      birthday: this.state.editBirthday,
      company: this.state.editCompany,
      title: this.state.editTitle
    }
    console.log(this.state.editId)
    request
      .put(`http://localhost:8000/contacts/${this.state.editId}`)
      .auth(localStorage.username, localStorage.password)
      .send(body)
      .then(res => {
        const idx = this.state.array.findIndex((entry) => entry.id === this.state.editId)
        const newArray = this.state.array
        newArray.splice(idx, 1, body)
        this.setState({
          array: newArray
        })
      })
    this.setState({
      editContact: false
    })
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
    if (this.state.addContact) {
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
    } else if (this.state.editContact) {
      return (
        <div className='Contacts'>
          <div className='container'>
            <form onSubmit={this.submitEdit}>
              <h1>Edit Contact</h1>
              <div className='input-field'>
                <label>Name(required)</label>
                <input type='text' name='editName' onChange={this.handleChange} value={this.state.editName} />
              </div>
              <div className='input-field'>
                <label>Email</label>
                <input type='email' name='editEmail' onChange={this.handleChange} value={this.state.editEmail} />
              </div>
              <div className='input-field'>
                <label>Number</label>
                <input type='tel' name='editNumber' onChange={this.handleChange} value={this.state.editNumber} />
              </div>
              <div className='input-field'>
                <label>Address</label>
                <input type='text' name='editAddress' onChange={this.handleChange} value={this.state.editAddress} />
              </div>
              <div className='input-field'>
                <label>Birthday</label>
                <input type='date' name='editBirthday' onChange={this.handleChange} value={this.state.editBirthday} />
              </div>
              <div className='input-field'>
                <label>Company</label>
                <input type='text' name='editCompany' onChange={this.handleChange} value={this.state.editCompany} />
              </div>
              <div className='input-field'>
                <label>Title</label>
                <input type='text' name='editTitle' onChange={this.handleChange} value={this.state.editTitle} />
              </div>
              <button type='submit'>Edit</button>
            </form>
          </div>
        </div>
      )
    } else if (this.state.search) {
      const filteredArray = this.state.array.filter(contact => contact.name.toLowerCase().includes(this.state.search.toLowerCase()))
      return (
        <div className='Contacts'>
          <div className='container'>
            <input type='text' onChange={this.search} />
            <button onClick={this.addContact}>Add Contact</button>
            {filteredArray.map((contact, idx) => (
              <div key={idx}>
                <Contact contact={contact} delete={this.delete} edit={this.edit} />
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div className='Contacts'>
          <div className='container'>
            <input type='text' onChange={this.search} />
            <button onClick={this.addContact}>Add Contact</button>
            {this.state.array.map((contact, idx) => (
              <div key={idx}>
                <Contact contact={contact} delete={this.delete} edit={this.edit} />
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
}

export default Contacts
