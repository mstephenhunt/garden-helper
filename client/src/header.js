import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render () {
    return (
      <header>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />

        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}