import React, { MouseEvent, ChangeEvent } from 'react'
import { Actions } from '../../../App'
import styled from 'styled-components'

interface Props {
  actions: Actions
  todo: { todo: string; isChecked: boolean }
  index: number
}

export default function ({
  actions: { toggleEditMode, toggleDone, remove },
  todo: { todo, isChecked },
  index
}: Props) {
  return (
    <div className="m-top-3 f f-align-center f-justify-between">
      <div className="f f-no-wrap f-align-center">
        <StyledCheckbox
          checked={isChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            toggleDone(e, index)
          }}
          type="checkbox"
          className={!isChecked ? 'button' : 'button is-link'}
        />
        <StyledButton
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            toggleEditMode(e, index)
          }}
          isChecked={isChecked}
          className="m-left-2"
        >
          {todo}
        </StyledButton>
      </div>
      <div className="f f-justify-between">
        <button
          type="button"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            remove(e, index)
          }}
          className="button is-small"
        >
          X
        </button>
      </div>
    </div>
  )
}

const StyledButton = styled.button<{ isChecked: boolean }>`
  background: none !important;
  color: ${({ isChecked }) => (isChecked ? 'grey' : 'inherit')};
  border: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0 !important;
  font: inherit;
  cursor: pointer;
  text-align: left;
  text-decoration: ${({ isChecked }) => (isChecked ? 'line-through' : 'none')};
  width: 87%;
`
const StyledCheckbox = styled.input`
  width: 1.5rem !important;
  height: 1.5rem !important;
`
