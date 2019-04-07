import React, {
  Component,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { List, Form } from './components'
import './App.css'
import 'bulma/css/bulma.css'

export interface State {
  activeTodos: { todo: string; isChecked: boolean; editMode: boolean }[]
  todoObject: { todo: string; isChecked: boolean; editMode: boolean }
  completedTodos: { todo: string; isChecked: boolean; editMode: boolean }[]
  tempTodo: { todo: string; isChecked: boolean; editMode: boolean }
}

export interface Actions {
  add: (e: KeyboardEvent<HTMLInputElement>) => void
  change: (e: ChangeEvent<HTMLInputElement>) => void
  edit: (e: ChangeEvent<HTMLInputElement>, index: number) => void
  update: (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLElement>,
    index: number
  ) => void
  cancel: (e: MouseEvent<HTMLElement>, index: number) => void
  toggleEditMode: (e: MouseEvent<HTMLElement>, index: number) => void
  toggleDone: (e: MouseEvent<HTMLSpanElement>, index: number) => void
  delete: (e: FormEvent<HTMLFormElement>) => void
}

export default class extends Component<{}, State> {
  state = {
    activeTodos: [{ todo: 'myTodo', isChecked: true, editMode: false }],
    todoObject: { todo: '', isChecked: false, editMode: false },
    completedTodos: [],
    tempTodo: { todo: '', isChecked: false, editMode: false },
  }

  actions: Actions = {
    add: this.handleAdd = this.handleAdd.bind(this),
    change: this.handleChange = this.handleChange.bind(this),
    edit: this.handleEdit = this.handleEdit.bind(this),
    update: this.handleUpdate = this.handleUpdate.bind(this),
    cancel: this.handleCancel = this.handleCancel.bind(this),
    delete: this.handleDelete = this.handleDelete.bind(this),
    toggleEditMode: this.handleToggleEditMode = this.handleToggleEditMode.bind(
      this
    ),
    toggleDone: this.handleToggleDone = this.handleToggleDone.bind(this),
  }

  private handleAdd(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.setState((prevState: State) => ({
        activeTodos: [...prevState.activeTodos, prevState.todoObject],
        todoObject: { todo: '', isChecked: false, editMode: false },
      }))
    }
  }

  private handleChange(e: ChangeEvent<HTMLInputElement>) {
    const todoText = e.currentTarget.value
    this.setState((prevState: State) => ({
      todoObject: {
        todo: todoText,
        isChecked: prevState.todoObject.isChecked,
        editMode: false,
      },
    }))
  }

  private handleEdit(e: ChangeEvent<HTMLInputElement>, index: number) {
    const list = this.state.activeTodos
    const todoText = e.currentTarget.value
    list[index] = {
      todo: todoText,
      isChecked: list[index].isChecked,
      editMode: true,
    }
    this.setState({ activeTodos: list })
  }

  private handleUpdate(
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLElement>,
    index: number
  ) {
    e.preventDefault()
    const list = this.state.activeTodos
    list[index] = {
      todo: list[index].todo,
      isChecked: list[index].isChecked,
      editMode: false,
    }
    if (list[index].todo) this.setState({ activeTodos: list })
  }

  private handleCancel(
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLElement>,
    index: number
  ) {
    const list = this.state.activeTodos
    list[index] = this.state.tempTodo
    list[index].editMode = false
    this.setState({ activeTodos: list })
  }

  private handleToggleEditMode(e: MouseEvent<HTMLSpanElement>, index: number) {
    const list = this.state.activeTodos
    list[index] = {
      todo: list[index].todo,
      isChecked: list[index].isChecked,
      editMode: true,
    }
    this.setState((prevState: State) => {
      let tempList = []
      tempList = [...prevState.activeTodos]
      return {
        tempTodo: tempList[index],
        activeTodos: list,
      }
    })
  }

  private handleToggleDone(e: MouseEvent<HTMLSpanElement>, index: number) {}

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
