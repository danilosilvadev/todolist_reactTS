import React, { Component, FormEvent, ChangeEvent, KeyboardEvent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { List, Form } from './components'
import './App.css'
import 'bulma/css/bulma.css'

export interface State {
  activeTodos: { todo: string; isChecked: boolean }[]
  todoObject: { todo: string; isChecked: boolean }
  completedTodos: string[]
}

export interface Actions {
  add: (e: KeyboardEvent<HTMLInputElement>) => void
  change: (e: ChangeEvent<HTMLInputElement>) => void
  edit: (e: ChangeEvent<HTMLInputElement>) => void
  update: (e: ChangeEvent<HTMLInputElement>) => void
  delete: (e: FormEvent<HTMLFormElement>) => void
}

export default class extends Component<{}, State> {
  state = {
    activeTodos: [{ todo: 'myTodo', isChecked: true }],
    todoObject: { todo: '', isChecked: false },
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
      this.setState((prevState: State) => ({
        activeTodos: [...prevState.activeTodos, prevState.todoObject],
        todoObject: { todo: '', isChecked: false },
      }))
    }
  }

  private handleChange(e: ChangeEvent<HTMLInputElement>) {
    const todo = e.currentTarget.value
    this.setState((prevState: State) => ({
      todoObject: {
        todo,
        isChecked: prevState.todoObject.isChecked,
      },
    }))
  }

  private handleEdit(e: ChangeEvent<HTMLInputElement>) {
    this.setState((prevState: State) => ({
      todoObject: {
        todo: e.currentTarget.value,
        isChecked: prevState.todoObject.isChecked,
      },
    }))
  }

  private handleUpdate(e: KeyboardEvent<HTMLInputElement>) {
    // TODO: Set position and update the element at its position
    const todo = e.currentTarget.value
    this.setState((prevState: State) => ({
      todoObject: {
        todo,
        isChecked: prevState.todoObject.isChecked,
      },
    }))
    if (e.key === 'Enter') {
      this.setState((prevState: State) => ({
        activeTodos: [...prevState.activeTodos, prevState.todoObject],
        todoObject: { todo: '', isChecked: false },
      }))
    }
  }

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
