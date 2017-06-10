import React from 'react'
import PropTypes from 'prop-types'

import './UrlSpan.scss'

const UrlSpan = (props) => {
  console.log(props.children)
  return (
    <span className='url-span'>
      <a href={props.children[0].props.text} target='_blank'>
        {props.children}
      </a>
    </span>
  )
}

UrlSpan.propTypes = {
  children: PropTypes.node.isRequired
}

export default UrlSpan
