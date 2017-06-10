import React from 'react'

import './RegistrationForm.scss'

class RegistrationForm extends React.Component {
  render () {
    return (
      <div className='registration-form-container'>
        <form>
          <div className='form-group'>
            <input className='form-control' placeholder='name' />
          </div>

          <div className='form-group'>
            <input className='form-control' placeholder='email' />
          </div>

          <div className='form-group'>
            <input className='form-control' placeholder='password' />
          </div>

          <button>
            Register
          </button>
        </form>
      </div>
    )
  }
}

RegistrationForm.propTypes = {

}

export default RegistrationForm
