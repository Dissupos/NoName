import React from 'react'
import PropTypes from 'prop-types'
import { omit } from 'lodash'

import './ButtonWithSpinner.scss'

const ButtonWithSpinner = (props) => (
  <button {...omit(props, 'isLoading')} disabled={props.isLoading}>
    {
      props.isLoading ? (
        <div className='btn-overlay text-center'>
          <i className='fa fa-spinner fa-pulse' />
        </div>
      ) : props.children
    }

  </button>
)

ButtonWithSpinner.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node
}

export default ButtonWithSpinner
