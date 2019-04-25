import React, { useContext, useState, useEffect } from 'react'
import { contextAPI } from './services'
import { auth } from './middlewares'

export default function() {
  const { Context } = contextAPI
  const myCont = useContext(Context)
  const [state, setContextAtState] = useState(myCont)
  console.log(JSON.stringify(state), 'meu state')
  const user = auth()

  useEffect(() => {
    if (!myCont) return
    setContextAtState({
      ...myCont,
      user,
    })
  }, [])

  /**
   * 1. Set state to be the value
   * 2. Set contextAPi to be at state
   * 3. Use the verify login function to change the state
   * 4. At verify login set the auth data to contextAPI
   */
  return (
    <Context.Provider value={state}>
      <div />
    </Context.Provider>
  )
}
