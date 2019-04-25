import React from 'react'
import { Actions, State } from '../../App2'
import TodoView from './todoView'
import TodoOnEditMode from './todoOnEditMode'

interface Props {
  actions: Actions
  state: State
}

export default function({ state: { activeTodos }, actions }: Props) {
  return (
    <ul>
      {activeTodos.length > 0 &&
        activeTodos.map(({ todo, isChecked, editMode, id }, index) => (
          <li key={id}>
            {todo === '' ? null : (
              <>
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
              </>
            )}
          </li>
        ))}
    </ul>
  )
}
