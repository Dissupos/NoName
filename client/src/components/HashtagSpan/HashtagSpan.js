import React from 'react'
import PropTypes from 'prop-types'

import './HashtagSpan.scss'

const HashtagSpan = (props) => {
  return (
    <span className='hashtag-span'>
      {props.children}
    </span>
  )
}

HashtagSpan.propTypes = {
  children: PropTypes.node
}

export default HashtagSpan
