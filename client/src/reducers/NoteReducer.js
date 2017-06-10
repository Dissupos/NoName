import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'
import {
  ADD_NOTE_ACTION,
  SELECT_NOTE_ACTION,
  SELECT_TAG_ACTION,
  ADD_TAG_ACTION,
  SAVE_NOTE_ACTION
} from '../constants/AppConstants'

const initialState = Immutable.fromJS({
  notes: [],
  tags: [
    'family',
    'programming',
    'others',
    'instagram',
    'love',
    'story',
    'finance',
    'new-things',
    'javascript',
    'java',
    'c++'
  ],
  selectedTag: null,
  selectedNote: null
})

export const addNoteAction = createAction(ADD_NOTE_ACTION)
export const selectNoteAction = createAction(SELECT_NOTE_ACTION)
export const selectTagAction = createAction(SELECT_TAG_ACTION)
export const addTagAction = createAction(ADD_TAG_ACTION)
export const saveNoteAction = createAction(SAVE_NOTE_ACTION)

export function addNote () {
  return addNoteAction()
}

export function selectNote (note) {
  return selectNoteAction(note)
}

export function addTag (tag) {
  return addTag(tag)
}

export function selectTag (tag) {
  return selectTagAction(tag)
}

export function saveNote (note) {
  return saveNoteAction(note)
}

export default handleActions({
  [ADD_NOTE_ACTION]: (state) => {
    let note = {
      id: state.get('notes').size,
      name: 'New note',
      description: null,
      created: new Date()
    }

    return (
      state.merge({
        notes: state.get('notes').push(Immutable.Map(note)),
        selectedNote: Immutable.Map(note)
      })
    )
  },

  [SELECT_NOTE_ACTION]: (state, action) => {
    let note = action.payload

    return (
      state.merge({
        selectedNote: state.get('selectedNote') === note ? null : note
      })
    )
  },

  [ADD_TAG_ACTION]: (state, action) => {
    let tag = action.payload

    return (
      state.merge({
        tags: state.get('tags').concat(tag)
      })
    )
  },

  [SELECT_TAG_ACTION]: (state, action) => {
    let tag = action.payload

    return (
      state.merge({
        selectedTag: state.get('selectedTag') === tag ? null : tag
      })
    )
  },

  [SAVE_NOTE_ACTION]: (state, action) => {
    let editedNote = action.payload

    let [note] = state.get('notes').filter((x) => x.get('id') === editedNote.id)
    let index = state.get('notes').indexOf(note)

    return (
      state.merge({
        notes: state.get('notes').update(index, () => Immutable.Map(editedNote)),
        selectedNote: Immutable.Map(editedNote)
      })
    )
  }
}, initialState)
