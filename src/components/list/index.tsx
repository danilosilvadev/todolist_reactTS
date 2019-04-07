import React, { ChangeEvent } from 'react'
import _ from 'lodash'
import { randomString } from '../../utils'
import styled from 'styled-components'
import { Actions, State } from '../../App'
interface Props {
  actions: Actions
  state: State
}

export default function({
  state,
  state: { activeTodos },
  actions: { update },
}: Props) {
  return (
    <ul>
      {!_.isEmpty(state) &&
        activeTodos.map(({ todo, isChecked }) => (
          <li key={randomString()} className="is-flex">
            <StyledInput
              type="text"
              value={todo}
              onChange={update}
              className="input"
            />
            <StyledCheckbox
              type="checkbox"
              checked={isChecked}
              className="checkbox"
              onChange={update}
            />
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
