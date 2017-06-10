import React from 'react'
import PropTypes from 'prop-types'
import GeminiScrollbar from 'react-gemini-scrollbar'
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  CompositeDecorator,
  convertToRaw,
  convertFromRaw
} from 'draft-js'
import HashtagSpan from '../HashtagSpan'
import UrlSpan from '../UrlSpan'
import NoteEditorControls from '../NoteEditorControls'
import { hashtagStrategy, urlStrategy } from '../../utils/strategies'
import * as _ from 'lodash'

import './NoteEditor.scss'
import '../../../node_modules/draft-js/dist/Draft.css'

class NoteEditor extends React.Component {
  constructor (props) {
    super(props)

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: hashtagStrategy,
        component: HashtagSpan
      },
      {
        strategy: urlStrategy,
        component: UrlSpan
      }
    ])

    this.state = {
      note: {
        editorState: EditorState.createEmpty(compositeDecorator)
      },
      compositeDecorator: compositeDecorator,
      inlineStyles: {
        'BOLD': false,
        'ITALIC': false,
        'UNDERLINE': false
      },
      blockTypes: {
        'header-one': false,
        'header-two': false,
        'header-three': false,
        'header-four': false,
        'header-five': false,
        'header-six': false,
        'unordered-list-item': false,
        'ordered-list-item': false,
        'code-block': false
      }
    }

    this.countLeftOffset = this.countLeftOffset.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlockTypeClick = this.handleBlockTypeClick.bind(this)
    this.handleEditorStateChange = this.handleEditorStateChange.bind(this)
    this.handleInlineStyleClick = this.handleInlineStyleClick.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }

  componentDidMount () {
    this.saveNote = _.debounce((note) => {
      this.props.actions.saveNote(note)
    }, 3000, { trailing: true })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedNote && nextProps.selectedNote.get('id') !== this.state.note.id) {
      let note = {
        id: nextProps.selectedNote.get('id'),
        name: nextProps.selectedNote.get('name')
      }

      let description = nextProps.selectedNote.toJS().description

      if (!description) {
        note.editorState = EditorState.createEmpty(this.state.compositeDecorator)
      } else {
        note.editorState = EditorState.createWithContent(
          convertFromRaw(nextProps.selectedNote.toJS().description),
          this.state.compositeDecorator
        )
      }

      this.setState({
        note: note
      })
    }
  }

  countLeftOffset () {
    return this.props.selectedTag ? '450px' : '150px'
  }

  handleChange (e) {
    let value = e.target.value
    let id = e.target.id

    this.setState({ note: { ...this.state.note, [id]: value } })
  }

  handleEditorStateChange (state) {
    let styles = Object.assign({}, { ...this.state.inlineStyles })
    let currentStyle = state.getCurrentInlineStyle().toJS()

    Object.keys(styles).forEach((val) => {
      styles[val] = currentStyle.includes(val)
    })

    let blockTypes = Object.assign({}, { ...this.state.blockTypes })
    let currentBlockType = RichUtils.getCurrentBlockType(state)

    Object.keys(blockTypes).forEach((val) => {
      blockTypes[val] = currentBlockType === val
    })

    this.setState({
      note: {
        ...this.state.note,
        editorState: state
      },
      inlineStyles: styles,
      blockTypes: blockTypes
    })

    this.saveNote({
      id: this.props.selectedNote.get('id'),
      created: this.props.selectedNote.get('created'),
      name: this.state.note.name,
      description: convertToRaw(state.getCurrentContent())
    })
  }

  /**
   * Handle key command.
   *
   * @param command
   * @returns {string}
   */
  handleKeyCommand (command) {
    const newState = RichUtils.handleKeyCommand(this.state.note.editorState, command)

    if (newState) {
      this.handleEditorStateChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  /**
   * Handle click on one of the inline style buttons.
   *
   * @param style
   */
  handleInlineStyleClick (style) {
    this.handleEditorStateChange(RichUtils.toggleInlineStyle(this.state.note.editorState, style))
  }

  /**
   * Handle click on one of the block type buttons.
   *
   * @param type
   */
  handleBlockTypeClick (type) {
    this.handleEditorStateChange(RichUtils.toggleBlockType(this.state.note.editorState, type))
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
              <div className='controls'>

                <input
                  id='name'
                  className='form-control note-name'
                  onChange={this.handleChange}
                  value={this.state.note.name} />

                <NoteEditorControls
                  onToggleBlockType={this.handleBlockTypeClick}
                  onToggleInlineStyle={this.handleInlineStyleClick}
                  blockTypes={this.state.blockTypes}
                  inlineStyles={this.state.inlineStyles} />
              </div>

              <GeminiScrollbar className='scrollbar'>
                <div className='note-desc'>
                  <div className='text-editor'>
                    <Editor
                      editorState={this.state.note.editorState}
                      handleKeyCommand={this.handleKeyCommand}
                      onChange={this.handleEditorStateChange} />
                  </div>
                </div>
              </GeminiScrollbar>

              <div className='note-settings'>
                <div className='row'>
                  <div className='col-xs-6'>

                  </div>
                  <div className='col-xs-6'>

                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}

NoteEditor.propTypes = {
  selectedNote: PropTypes.object,
  selectedTag: PropTypes.any,
  actions: PropTypes.object
}

export default NoteEditor
