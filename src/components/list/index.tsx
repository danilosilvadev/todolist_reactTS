import React, { MouseEvent, ChangeEvent, FormEvent } from 'react'
import _ from 'lodash'
import { randomString } from '../../utils'
import styled from 'styled-components'
import { Actions, State } from '../../App'
interface Props {
  actions: Actions
  state: State
}

export default function ({
  state,
  state: { activeTodos },
  actions: { update, edit, toggleEditMode, toggleDone, cancel, remove },
}: Props) {
  return (
    <ul>
      {!_.isEmpty(state) &&
        activeTodos.map(({ todo, isChecked, editMode }, index) => (
          <li key={randomString()} className="is-flex">
            {!editMode ? (
              <>
                <button
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    toggleEditMode(e, index)
                  }}
                  style={{
                    textDecoration: `${isChecked ? 'line-through' : 'none'}`,
                  }}
                >
                  {todo}
                </button>
                <StyledCheckbox
                  type="checkbox"
                  checked={isChecked}
                  className="checkbox"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    toggleDone(e, index)
                  }}
                />
                <button type='button' onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    remove(e, index)
                  }}>
                  X
                </button>
              </>
            ) : (
              <form
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  update(e, index)
                }}
                name="save"
              >
                <StyledInput
                  type="text"
                  value={todo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    edit(e, index)
                  }}
                  className="input"
                  required
                />
                <StyledCheckbox
                  type="checkbox"
                  checked={isChecked}
                  className="checkbox"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    toggleDone(e, index)
                  }}
                />
                <button
                  type="button"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    update(e, index)
                  }}
                  name="save"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    cancel(e, index)
                  }}
                  name="cancel"
                >
                  Cancel
                </button>
              </form>
            )}
          </li>
        ))}
    </ul>
  )
}

const StyledInput = styled.input<{ type: string; value: string }>`
  border: none;
  width: 100%;
`

const StyledCheckbox = styled.input<{ type: string; checked: boolean }>``
