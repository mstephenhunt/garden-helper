import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import LoginForm from './login'

export default class Main extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginForm} />
          <Route path="/login" componqent={LoginForm} />
        </div>
      </Router>
    )
  }
}