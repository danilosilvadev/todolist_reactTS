import React, { ChangeEvent, KeyboardEvent } from 'react'
import _ from 'lodash'

interface Props {
  actions: {
    add: (e: KeyboardEvent<HTMLInputElement>) => void
    change: (e: ChangeEvent<HTMLInputElement>) => void
  }
  state: { todo: string }
}

export default function({
  state,
  state: { todo },
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
