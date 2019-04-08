import React, {
  Component,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import _ from 'lodash'
import { List, Form } from './components'
import './App.css'
import 'bulma/css/bulma.css'

type todo = { todo: string; isChecked: boolean; editMode: boolean }
type keyBoard = (e: KeyboardEvent<HTMLInputElement>) => void
type onChange = (e: ChangeEvent<HTMLInputElement>) => void
type onChangeAndIndex = (
  e: ChangeEvent<HTMLInputElement>,
  index: number
) => void
type formAndIdex = (
  e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
  index: number
) => void
type onClickAndIndex = (e: MouseEvent<HTMLButtonElement>, index: number) => void
type onClick = (e: FormEvent<HTMLButtonElement>) => void
type checkboxClick = (e: MouseEvent<HTMLInputElement>, index: number) => void
export interface State {
  activeTodos: todo[]
  todoObject: todo
  completedTodos: todo[]
  tempTodo: todo
}

export interface Actions {
  add: keyBoard
  change: onChange
  edit: onChangeAndIndex
  update: formAndIdex
  cancel: onClickAndIndex
  toggleEditMode: onClickAndIndex
  toggleDone: onChangeAndIndex
  remove: onClickAndIndex
}

export default class extends Component<{}, State> {
  state = {
    activeTodos: [{ todo: 'myTodo', isChecked: true, editMode: false }],
    todoObject: { todo: '', isChecked: false, editMode: false },
    completedTodos: [],
    tempTodo: { todo: '', isChecked: false, editMode: false },
  }

  private handleAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.setState((prevState: State) => ({
        activeTodos: [...prevState.activeTodos, prevState.todoObject],
        todoObject: { todo: '', isChecked: false, editMode: false },
      }))
    }
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const todoText = e.currentTarget.value
    this.setState((prevState: State) => ({
      todoObject: {
        todo: todoText,
        isChecked: prevState.todoObject.isChecked,
        editMode: false
      }
    }))
  }

  private handleEdit = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let list: todo[] = [...this.state.activeTodos]
    const todoText = e.currentTarget.value
    list[index] = {
      todo: todoText,
      isChecked: list[index].isChecked,
      editMode: true
    }
    this.setState({ activeTodos: list })
  }

  private handleUpdate = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault()
    const list = this.state.activeTodos
    list[index] = {
      todo: list[index].todo,
      isChecked: list[index].isChecked,
      editMode: false
    }
    if (list[index].todo) this.setState({ activeTodos: list })
  }

  private handleCancel = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const list = this.state.activeTodos
    list[index] = this.state.tempTodo
    list[index].editMode = false
    this.setState({ activeTodos: list })
  }

  private handleToggleEditMode = (
    e: MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
    let list: todo[] = [...this.state.activeTodos]
    list[index] = {
      todo: list[index].todo,
      isChecked: list[index].isChecked,
      editMode: true
    }
    this.setState((prevState: State) => {
      let tempList = []
      tempList = [...prevState.activeTodos]
      return {
        tempTodo: tempList[index],
        activeTodos: list
      }
    })
  }

  private handleToggleDone = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let list: todo[] = [...this.state.activeTodos]
    list[index].isChecked = !this.state.activeTodos[index].isChecked
    const completedList = [...this.state.activeTodos].filter(
      (item, i) => list[i].isChecked && item
    )
    this.setState({
      activeTodos: list,
      completedTodos: completedList
    }, () => {
      console.log(this.state.completedTodos)
    })
  }

  private handleRemove = (
    e: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    let list: todo[] = [...this.state.activeTodos]
    const newList = _.remove(list, (item: todo, i: number) => {
      return i !== index
    })
    const completedList = [...newList].filter(
      (item, i) => list[i].isChecked && item
    )
    this.setState({
      activeTodos: newList,
      completedTodos: completedList
    })
  }

  actions: Actions = {
    add: this.handleAdd,
    change: this.handleChange,
    edit: this.handleEdit,
    update: this.handleUpdate,
    cancel: this.handleCancel,
    remove: this.handleRemove,
    toggleEditMode: this.handleToggleEditMode,
    toggleDone: this.handleToggleDone
  }

  render () {
    return (
      <div className="columns is-centered">
        <div className="column is-6-desktop is-6-mobile">
        <h1>TODO</h1>
          <Form state={this.state} actions={this.actions} />
          <List state={this.state} actions={this.actions} />
          <nav>
            <ul className='is-flex'>
              <li><a>All</a></li>
              <li><a>Active</a></li>
              <li><a>Done</a></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
