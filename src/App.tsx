import React, { Component, FormEvent, ChangeEvent, KeyboardEvent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { List, Form } from './components'
import './App.css'
import 'bulma/css/bulma.css'

interface State {
  activeTodos: string[]
  todo: string
  completedTodos: string[]
}

interface Actions {
  add: (e: KeyboardEvent<HTMLInputElement>) => void
  change: (e: ChangeEvent<HTMLInputElement>) => void
  edit: (e: ChangeEvent<HTMLInputElement>) => void
  update: (e: FormEvent<HTMLFormElement>) => void
  delete: (e: FormEvent<HTMLFormElement>) => void
}

export default class extends Component<{}, State> {
  state = {
    activeTodos: ['MyList is ready', 'Daquele jeito', 'Tchubibaladumtum'],
    todo: '',
    completedTodos: [],
  }

  actions: Actions = {
    add: this.handleAdd = this.handleAdd.bind(this),
    change: this.handleChange = this.handleChange.bind(this),
    edit: this.handleEdit = this.handleEdit.bind(this),
    update: this.handleUpdate = this.handleUpdate.bind(this),
    delete: this.handleDelete = this.handleDelete.bind(this),
  }

  private handleAdd(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.setState(({ activeTodos, todo }) => ({
        activeTodos: [...activeTodos, todo],
        todo: '',
      }))
    }
  }

  private handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      todo: e.currentTarget.value,
    })
  }

  private handleEdit(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      todo: e.target.value,
    })
  }

  private handleUpdate() {}

  private handleDelete() {}

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul className="tabs is-small">
              <li className="is-active">
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

          <Route
            path="/"
            exact
            render={() => (
              <div className="columns is-centered">
                <div className="column is-6-desktop is-6-mobile">
                  <Form state={this.state} actions={this.actions} />
                  <List state={this.state} actions={this.actions} />
                </div>
              </div>
            )}
          />
          <Route path="/about/" component={() => <div />} />
          <Route path="/users/" component={() => <div />} />
        </div>
      </Router>
    )
  }
}
