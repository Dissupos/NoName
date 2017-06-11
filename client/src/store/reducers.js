import { combineReducers } from 'redux'
import locationReducer from './location'
import noteReducer from '../reducers/NoteReducer'
import authReducer from '../reducers/AuthReducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    noteReducer: noteReducer,
    authReducer: authReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
