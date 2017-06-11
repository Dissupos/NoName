// Action constants

export const SELECT_NOTE_ACTION = 'SELECT_NOTE_ACTION'

export const ADD_NOTE_ACTION = 'ADD_NOTE_ACTION'

export const SELECT_TAG_ACTION = 'SELECT_TAG_ACTION'

export const ADD_TAG_ACTION = 'ADD_TAG_ACTION'

export const SAVE_NOTE_ACTION = 'SAVE_NOTE_ACTION'

export const AUTH_LOAD_START = 'AUTH_LOAD_START'

export const AUTH_LOAD_SUCCESS = 'AUTH_LOAD_SUCCESS'

export const AUTH_REGISTRATION_FAILURE = 'AUTH_REGISTRATION_FAILURE'

export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'

export const AUTH_LOGOUT_ACTION = 'AUTH_LOGOUT_ACTION'

// Editor constants

export const BLOCK_TYPE_BUTTON_LABELS = {
  'header-one': 'H1',
  'header-two': 'H2',
  'header-three': 'H3',
  'header-four': 'H4',
  'header-five': 'H5',
  'header-six': 'H6',
  'unordered-list-item': 'UL',
  'ordered-list-item': 'OL',
  'code-block': 'CODE'
}

export const BLOCK_TYPE_BUTTON_ICON = {
  'unordered-list-item': 'UL',
  'ordered-list-item': 'OL'
}

// URLs

export const API_URL = '//localhost/api/v1'

export const REGISTRATION_URL = `${API_URL}/register`

export const LOGIN_URL = `${API_URL}/login`

export const GET_NOTES = `${API_URL}/notes`
