import React, { ChangeEvent } from 'react'
import _ from 'lodash'
import { randomString } from '../../utils'
import styled from 'styled-components'

interface Props {
  actions: { update: Function }
  state: { activeTodos: string[] }
}

export default function({
  state,
  state: { activeTodos },
  actions: { update },
}: Props) {
  return (
    <ul>
      {!_.isEmpty(state) &&
        activeTodos.map((item: string) => (
          <li key={randomString()} className="is-flex">
            <StyledInput
              type="text"
              value={item}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                update(e)
              }}
              className="input"
            />
            <StyledCheckbox type="checkbox" checked className="checkbox" />
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
