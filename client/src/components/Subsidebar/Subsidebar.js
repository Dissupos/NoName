import React from 'react'
import PropTypes from 'prop-types'
import GeminiScrollbar from 'react-gemini-scrollbar'

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
    let time = Date.now() - date
    let unit = 'ms'

    if (time > 1000) {
      unit = 'sec'
      time /= 1000
    }

    if (time > 60) {
      unit = 'min'
      time /= 60
    }

    if (time > 60) {
      unit = 'hours'
      time /= 60
    }

    return `${time.toFixed(0)}${unit} ago`
  }

  selectNote (note) {
    this.props.actions.selectNote(note)
  }

  createNote () {
    this.props.actions.addNote()
  }

  isNoteSelected (note) {
    return this.props.selectedNote && this.props.selectedNote.id === note.id
  }

  render () {
    let notes = this.props.notes

    return (
      <div className={`subsidebar-container ${this.props.tag && 'opened'}`}>
        <div className='header'>
          {
            this.props.tag !== 'all'
              ? `Notes with #${this.props.tag} tag` : `All notes`
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
                key={val.id}>
                <div>
                  <div className='created-at'>
                    {this.getPassedTime(val.created)}
                  </div>
                </div>
                <div>
                  <div className='note-name'>
                    {val.name}
                  </div>
                  <div className='note-desc'>
                    {val.description}
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
  notes: PropTypes.array,
  tag: PropTypes.any,
  actions: PropTypes.object,
  selectedNote: PropTypes.object
}

export default Subsidebar
