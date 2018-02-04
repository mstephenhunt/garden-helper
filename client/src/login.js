import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit (event) {
    const { username, password } = this.state

    fetch('/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    event.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText">
          <ControlLabel>Username:</ControlLabel>
          <FormControl
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>

        <Button type="submit">Login</Button>
      </form>
    )
  }
}