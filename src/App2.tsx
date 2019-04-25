import React, {
  Component,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  KeyboardEventHandler,
  ChangeEventHandler
} from 'react'
import _ from 'lodash'
import { TodoForm, TodoList } from './components'
import 'bulma/css/bulma.css'
import './utils/scss/index.scss'
import { randomString } from './utils'

type todo = { todo: string; isChecked: boolean; editMode: boolean, id: string }

export interface State {
  activeTodos: todo[]
  todoObject: todo
  tempTodo: todo
}

export interface Actions {
  add: KeyboardEventHandler
  change: ChangeEventHandler
  edit: (e: ChangeEvent<HTMLInputElement>, index: number) => void
  update: (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
    index: number
  ) => void
  cancel: (e: MouseEvent<HTMLButtonElement>, index: number) => void
  toggleEditMode: (e: MouseEvent<HTMLButtonElement>, index: number) => void
  toggleDone: (e: ChangeEvent<HTMLInputElement>, index: number) => void
  remove: (e: MouseEvent<HTMLButtonElement>, index: number) => void
}

const todoDefault = { todo: '', isChecked: false, editMode: false, id: '' }

export default class extends Component<{}, State> {
  state = {
    activeTodos: [todoDefault],
    todoObject: todoDefault,
    tempTodo: todoDefault
  }

  handleAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.setState((prevState: State) => ({
        activeTodos: [...prevState.activeTodos, prevState.todoObject],
        todoObject: { todo: '', isChecked: false, editMode: false, id: randomString() }
      }))
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const todoText = e.currentTarget.value
    this.setState((prevState: State) => ({
      todoObject: {
        todo: todoText,
        isChecked: prevState.todoObject.isChecked,
        editMode: false,
        id: randomString()
      }
    }))
  }

  handleEdit = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let list = [...this.state.activeTodos]
    const todoText = e.currentTarget.value
    list[index] = {
      todo: todoText,
      isChecked: list[index].isChecked,
      editMode: true,
      id: list[index].id
    }
    this.setState({ activeTodos: list })
  }

  handleUpdate = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault()
    const list = [...this.state.activeTodos]
    if (list.length > 0) {
      list[index] = {
        todo: list[index].todo,
        isChecked: list[index].isChecked,
        editMode: false,
        id: list[index].id
      }
      if (list[index].todo) this.setState({ activeTodos: list })
    }
  }

  handleCancel = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const list = [...this.state.activeTodos]
    if (list.length > 0) {
      list[index] = this.state.tempTodo
      list[index].editMode = false
      this.setState({ activeTodos: list })
    }
  }

  handleToggleEditMode = (e: MouseEvent<HTMLSpanElement>, index: number) => {
    let list = [...this.state.activeTodos]
    list[index] = {
      todo: list[index].todo,
      isChecked: list[index].isChecked,
      editMode: true,
      id: list[index].id
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

  handleToggleDone = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let list = [...this.state.activeTodos]
    list[index].isChecked =
      this.state.activeTodos[index] && !this.state.activeTodos[index].isChecked
    this.setState({
      activeTodos: list
    })
  }

  handleRemove = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    let list = [...this.state.activeTodos]
    const newList = _.remove(list, (item: todo, i: number) => {
      return i !== index
    })
    this.setState({
      activeTodos: newList
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
    toggleDone: this.handleToggleDone,
  }

  render() {
    return (
      <div className="columns is-centered section f">
        <div className="column is-10-mobile is-8-tablet is-6-desktop">
          <h1>TODOS</h1>
          <TodoForm state={this.state} actions={this.actions} />
          <TodoList state={this.state} actions={this.actions} />
        </div>
      </div>
    )
  }
}
