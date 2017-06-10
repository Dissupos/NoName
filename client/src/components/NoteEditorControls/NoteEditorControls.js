import React from 'react'
import PropTypes from 'prop-types'
import { BLOCK_TYPE_BUTTON_LABELS } from '../../constants/AppConstants'

import './NoteEditorControls.scss'

class NoteEditorControls extends React.Component {
  constructor (props) {
    super(props)

    this.handleInlineStyleClick = this.handleInlineStyleClick.bind(this)
  }

  handleInlineStyleClick (e, style) {
    e.preventDefault()

    this.props.onToggleInlineStyle(style)
  }

  handleBlockTypeClick (e, type) {
    e.preventDefault()

    this.props.onToggleBlockType(type)
  }

  render () {
    return (
      <div className='control-buttons'>
        <div className='buttons-group'>
          {this.props.inlineStyles && Object.keys(this.props.inlineStyles).map((style) => (
            <span
              key={style}
              className={`${style.toLowerCase()}-btn ${this.props.inlineStyles[style] && 'active'}`}
              onMouseDown={(e) => {
                this.handleInlineStyleClick(e, style)
              }}>
              {style[0]}
            </span>
          ))}
        </div>

        <div className='buttons-group block-types'>
          {this.props.blockTypes && Object.keys(this.props.blockTypes).map((type) => (
            <span
              key={type}
              className={`${type.toLowerCase()}-btn ${this.props.blockTypes[type] && 'active'}`}
              onMouseDown={(e) => {
                this.handleBlockTypeClick(e, type)
              }}>
              {BLOCK_TYPE_BUTTON_LABELS[type]}
            </span>
          ))}
        </div>
      </div>
    )
  }
}

NoteEditorControls.propTypes = {
  onToggleInlineStyle: PropTypes.func.isRequired,
  onToggleBlockType: PropTypes.func.isRequired,
  inlineStyles: PropTypes.object,
  blockTypes: PropTypes.object
}

export default NoteEditorControls
