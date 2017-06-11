import Immutable from 'immutable'
import { bind } from 'redux-effects'
import { fetch } from 'redux-effects-fetch'
import { createAction, handleActions } from 'redux-actions'
import {
  AUTH_LOAD_START,
  AUTH_LOAD_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTRATION_FAILURE,
  LOGIN_URL,
  REGISTRATION_URL,
  AUTH_LOGOUT_ACTION
} from '../constants/AppConstants'

const initialState = Immutable.fromJS({
  loggedUser: null,
  isAuthenticated: false,
  authToken: false,
  loginError: null,
  registrationErrors: null
})

export const authLoadStart = createAction(AUTH_LOAD_START)
export const authLoadSuccess = createAction(AUTH_LOAD_SUCCESS)
export const authLoginFailure = createAction(AUTH_LOGIN_FAILURE)
export const authRegistrationFailure = createAction(AUTH_REGISTRATION_FAILURE)
export const authLogout = createAction(AUTH_LOGOUT_ACTION)

export function login ({ email, password }) {
  return [
    authLoadStart(),
    bind(
      fetch(LOGIN_URL, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }),
      (response) => authLoadSuccess(response),
      (response) => authLoginFailure(response)
    )
  ]
}

export function register ({ email, password, name }) {
  return [
    authLoadStart(),
    bind(
      fetch(REGISTRATION_URL, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      }),
      (response) => authLoadSuccess(response),
      (response) => authRegistrationFailure(response)
    )
  ]
}

export function logout () {
  return authLogout()
}

export default handleActions({
  [AUTH_LOAD_START]: (state) => {
    return (
      state.merge({
        loginError: null,
        registrationErrors: null,
        loggedUser: null,
        isAuthenticated: false,
        authToken: null
      })
    )
  },

  [AUTH_LOAD_SUCCESS]: (state, action) => {
    let value = action.payload.value

    return (
      state.merge({
        isAuthenticated: true,
        authToken: value.access_token,
        errors: null,
        loginError: null,
        registrationErrors: null
      })
    )
  },

  [AUTH_LOGIN_FAILURE]: (state, action) => {
    return (
      state.merge({
        loginError: Immutable.List(action.payload.value.message)
      })
    )
  },

  [AUTH_REGISTRATION_FAILURE]: (state, action) => {
    return (
      state.merge({
        registrationErrors: Immutable.List(action.payload.value)
      })
    )
  },

  [AUTH_LOGOUT_ACTION]: (state) => {
    return (
      state.merge({
        error: null,
        loggedUser: null,
        authToken: null,
        isAuthenticated: false,
        loginError: null,
        registrationErrors: null
      })
    )
  }
}, initialState)
