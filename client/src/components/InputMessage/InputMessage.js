import React from 'react'
import PropTypes from 'prop-types'

import './InputMessage.scss'

const InputMessage = (props) => {
  return (
    <div className='input-message'>
      &nbsp;
      {props.shown ? props.children : null}
    </div>
  )
}

InputMessage.propTypes = {
  shown: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default InputMessage
