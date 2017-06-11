import Immutable from 'immutable'
import { bind } from 'redux-effects'
import { fetch } from 'redux-effects-fetch'
import { createAction, handleActions } from 'redux-actions'
import {
  AUTH_LOAD_START,
  AUTH_LOAD_SUCCESS,
  AUTH_LOAD_FAILURE,
  LOGIN_URL,
  REGISTRATION_URL
} from '../constants/AppConstants'

const initialState = Immutable.fromJS({
  loggedUser: null,
  isAuthenticated: false,
  authToken: false,
  errors: null
})

export const authLoadStart = createAction(AUTH_LOAD_START)
export const authLoadSuccess = createAction(AUTH_LOAD_SUCCESS)
export const authLoadFailure = createAction(AUTH_LOAD_FAILURE)

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
      (response) => authLoadFailure(response)
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
      (response) => authLoadFailure(response)
    )
  ]
}

export default handleActions({
  [AUTH_LOAD_START]: (state) => {
    return (
      state.merge({
        error: null,
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
        authToken: value.access_token
      })
    )
  },

  [AUTH_LOAD_FAILURE]: (state, action) => {
    console.log(action)

    return state
  }
}, initialState)
