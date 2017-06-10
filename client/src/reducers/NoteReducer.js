import { createAction, handleActions } from 'redux-actions'
import { ADD_NOTE_ACTION, SELECT_NOTE_ACTION, SELECT_TAG_ACTION } from '../constants/AppConstants'

const initialState = {
  notes: [
    {
      id: 0,
      name: 'Example note 1',
      description: 'It is an example note used to test app. It is an example note used to test app.',
      created: new Date(2017, 5, 10, 0, 25)
    },
    {
      id: 1,
      name: 'Example note 2',
      description: 'It is an example note used to test app. It is an example note used to test app.',
      created: new Date(2017, 5, 10, 0, 27)
    },
    {
      id: 2,
      name: 'Example note 3',
      description: 'It is an example note used to test app. It is an example note used to test app.',
      created: new Date(2017, 5, 10, 0, 15)
    }
  ],
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
}

export const addNoteAction = createAction(ADD_NOTE_ACTION)
export const selectNoteAction = createAction(SELECT_NOTE_ACTION)
export const selectTagAction = createAction(SELECT_TAG_ACTION)

export function addNote () {
  return addNoteAction()
}

export function selectNote (note) {
  return selectNoteAction(note)
}

export function selectTag (tag) {
  return selectTagAction(tag)
}

export default handleActions({
  [ADD_NOTE_ACTION]: (state) => {
    let note = {
      id: state.notes.length,
      name: 'New note',
      description: 'Write your note here',
      created: new Date()
    }

    return {
      ...state,
      notes: state.notes.concat(note),
      selectedNote: note
    }
  },

  [SELECT_NOTE_ACTION]: (state, action) => {
    let note = action.payload

    return {
      ...state,
      selectedNote: state.selectedNote === note ? null : note
    }
  },

  [SELECT_TAG_ACTION]: (state, action) => {
    let tag = action.payload

    return {
      ...state,
      selectedTag: state.selectedTag === tag ? null : tag
    }
  }
}, initialState)
