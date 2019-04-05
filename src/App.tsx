import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'

interface State {
  list: string[];
}

export default class extends Component<{}, State> {
  state = {
    list: []
  };

  actions: Record<string, any> = {
    add: this.handleAdd = this.handleAdd.bind(this),
    edit: this.handleEdit = this.handleEdit.bind(this),
    update: this.handleUpdate = this.handleUpdate.bind(this),
    delete: this.handleDelete = this.handleDelete.bind(this)
  };

  handleAdd () {}

  handleEdit () {}

  handleUpdate () {}

  handleDelete () {}

  render () {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={() => <div />} />
          <Route path="/about/" component={() => <div />} />
          <Route path="/users/" component={() => <div />} />
        </div>
      </Router>
    )
  }
}
