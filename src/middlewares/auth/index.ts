import React, { useContext } from 'react'
import { getCookie } from '../../services'
import { contextAPI } from '../../services'

export interface authType {
  islogged: boolean
  token: string
  access_token: string
  email: string
}

export function auth() {
  const token = getCookie('token'),
    access_token = getCookie('access_token'),
    email = getCookie('email')

  var authData: authType

  if (token && access_token) {
    authData = {
      islogged: true,
      token,
      access_token,
      email,
    }
    // action with fetch to login.then and change contextAPI prop to true where it says is auth
  }
  const user = {
    islogged: true,
    name: 'Mário alberto',
  }
  return user
}
