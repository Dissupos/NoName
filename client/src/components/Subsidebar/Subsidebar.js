import React from 'react'
import PropTypes from 'prop-types'
import GeminiScrollbar from 'react-gemini-scrollbar'
import { countPassedTime } from '../../utils/countPassedTime'

import './Subsidebar.scss'

class Subsidebar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      query: ''
    }

    this.createNote = this.createNote.bind(this)
    this.getPassedTime = this.getPassedTime.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.isNoteSelected = this.isNoteSelected.bind(this)
    this.selectNote = this.selectNote.bind(this)
    this.search = this.search.bind(this)
  }

  search (e) {
    /**
     * TODO: add action
     */
  }

  handleQueryChange (e) {
    this.setState({
      query: e.target.value
    }, () => {
      this.search()
    })
  }

  getPassedTime (date) {
    return countPassedTime(date)
  }

  selectNote (note) {
    this.props.actions.selectNote(note)
  }

  createNote () {
    this.props.actions.addNote()
  }

  isNoteSelected (note) {
    return this.props.selectedNote && this.props.selectedNote.get('id') === note.get('id')
  }

  render () {
    let notes = this.props.notes

    return (
      <div className={`subsidebar-container ${this.props.selectedTag && 'opened'}`}>
        <div className='header'>
          {
            this.props.selectedTag !== 'all'
              ? `Notes with #${this.props.selectedTag} tag` : `All notes`
          }

          <i
            className='fa fa-arrow-left pull-right'
            onClick={() => {
              this.props.actions.selectTag(this.props.selectedTag)
            }} />
        </div>

        <div className='search-form-container'>
          <form>
            <input
              id='search-input'
              className='form-control'
              placeholder='Search for notes'
              onChange={this.handleQueryChange} />

            <div className='add-note-container'>
              <i
                className='fa fa-pencil-square-o'
                onClick={() => {
                  this.createNote()
                }} />
            </div>
          </form>
        </div>

        <GeminiScrollbar>
          <div className='notes-container'>
            {notes && notes.map((val) => (
              <div
                onClick={() => {
                  this.selectNote(val)
                }}
                className={`note ${this.isNoteSelected(val) && 'selected'}`}
                key={val.get('id')}>
                <div>
                  <div className='created-at'>
                    {this.getPassedTime(val.get('created'))}
                  </div>
                </div>
                <div>
                  <div className='note-name'>
                    {val.get('name')}
                  </div>
                  <div className='note-desc'>
                    {val.get('description') && val.get('description').blocks[0].text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GeminiScrollbar>
      </div>
    )
  }
}

Subsidebar.propTypes = {
  notes: PropTypes.object,
  actions: PropTypes.object,
  selectedNote: PropTypes.object,
  selectedTag: PropTypes.any
}

export default Subsidebar
