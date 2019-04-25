import React from 'react'

export interface contextType {
  auth: {
    islogged: boolean
    token: string
    access_token: string
    email: string
  }
  user: {
    name: string
    islogged: boolean
  }
  theme: {
    color: string
  }
}

export const Context = React.createContext<contextType | null>({
  auth: {
    islogged: false,
    token: '',
    access_token: '',
    email: '',
  },
  user: {
    name,
    islogged: false,
  },
  theme: {
    color: 'blue',
  },
})
