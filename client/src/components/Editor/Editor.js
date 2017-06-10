import React from 'react'
import PropTypes from 'prop-types'

import './Editor.scss'

class Editor extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      note: {
        name: '',
        desc: ''
      }
    }

    this.countLeftOffset = this.countLeftOffset.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveNote = this.saveNote.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedNote) {
      this.setState({ note: nextProps.selectedNote })
    }
  }

  countLeftOffset () {
    return this.props.selectedTag ? '450px' : '150px'
  }

  saveNote (e) {
    e.preventDefault()

    return false
  }

  handleChange (e) {
    let value = e.target.value
    let id = e.target.id

    this.setState({ note: { ...this.state.note, [id]: value } })
  }

  render () {
    return (
      <div className='editor-container' style={{ left: this.countLeftOffset() }}>
        {!this.props.selectedNote && (
          <div className='no-note-message-container text-center'>
            <div className='no-note-message'>
              <h4>Nothing is selected</h4>
              <p>Select or create note to edit it</p>
            </div>
          </div>
        )}

        {this.props.selectedNote && (
          <div className='note-selected'>
            <form onSubmit={this.saveNote}>
              <div className='note-name'>
                <input
                  id='name'
                  className='form-control'
                  onChange={this.handleChange}
                  value={this.state.note.name} />
              </div>
              <div className='note-desc'>
                <textarea
                  id='description'
                  rows='25'
                  className='form-control'
                  onChange={this.handleChange}
                  value={this.state.note.description} />
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}

Editor.propTypes = {
  selectedNote: PropTypes.object,
  selectedTag: PropTypes.any
}

export default Editor
