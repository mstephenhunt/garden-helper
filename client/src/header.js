import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'

export default class Header extends Component {
  render () {
    return (
      <header>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />

        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Garden Helper</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/register">
              Register
            </NavItem>
          </Nav>
        </Navbar>
      </header>
    )
  }
}