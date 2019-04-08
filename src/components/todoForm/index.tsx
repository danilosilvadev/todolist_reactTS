import React from 'react'
import _ from 'lodash'
import { State, Actions } from '../../App'

interface Props {
  actions: Actions
  state: State
}

export default function({
  state,
  state: {
    todoObject: { todo },
  },
  actions: { add, change },
}: Props) {
  return (
    <>
      {!_.isEmpty(state) && (
        <input
          type="text"
          onKeyPress={add}
          placeholder="New todo..."
          value={todo}
          onChange={change}
          className="input new_todo"
        />
      )}
    </>
  )
}
