import React, { FormEvent, ChangeEvent, MouseEvent } from 'react'
import { Actions, State } from '../../../App2'
import styled from 'styled-components'

interface Props {
  actions: Actions
  index: number
  todo: { todo: string; isChecked: boolean }
}

export default function({
  actions: { update, cancel, edit, toggleDone },
  index,
  todo: { todo, isChecked },
}: Props) {
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        update(e, index)
      }}
      name="save"
      className="m-top-3"
    >
      <div className="f f-align-center">
        <StyledCheckbox
          checked={isChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            toggleDone(e, index)
          }}
          type="checkbox"
          className={!isChecked ? 'button' : 'button is-link'}
        />
        <StyledInput
          type="text"
          value={todo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            edit(e, index)
          }}
          className="input m-left-2"
          required
        />
      </div>
      <div className="m-top-1 f f-justify-between">
        <button
          type="button"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            update(e, index)
          }}
          name="save"
          className="button is-primary"
        >
          Save
        </button>
        <button
          type="button"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            cancel(e, index)
          }}
          name="cancel"
          className="button is-warning"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

const StyledInput = styled.input<{ type: string; value: string }>`
  border: none;
  width: 87%;
  max-width: 200px;
`
const StyledCheckbox = styled.input`
  width: 1.5rem !important;
  height: 1.5rem !important;
`
