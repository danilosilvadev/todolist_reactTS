import React, { MouseEvent, ChangeEvent, FormEvent } from 'react'
import { randomString } from '../../utils'
import styled from 'styled-components'
import { Actions, State } from '../../App'
import TodoView from './todoView'
import TodoOnEditMode from './todoOnEditMode'

interface Props {
  actions: Actions
  state: State
}

export default function({ state, state: { activeTodos }, actions }: Props) {
  return (
    <ul>
      {activeTodos.length > 0 &&
        activeTodos.map(({ todo, isChecked, editMode }, index) => (
          <>
            {todo === '' ? null : (
              <li key={randomString()}>
                {!editMode ? (
                  <TodoView
                    actions={actions}
                    index={index}
                    todo={{ todo, isChecked }}
                  />
                ) : (
                  <TodoOnEditMode
                    actions={actions}
                    index={index}
                    todo={{ todo, isChecked }}
                  />
                )}
              </li>
            )}
          </>
        ))}
    </ul>
  )
}

const StyledInput = styled.input<{ type: string; value: string }>`
  border: none;
  width: 100%;
`

const StyledCheckbox = styled.input<{ type: string; checked: boolean }>``

const StyledButton = styled.button`
  padding: 0;
  border: none;
  background: none;
`
