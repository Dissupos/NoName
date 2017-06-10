import React from 'react'

import './LoginForm.scss'

class LoginForm extends React.Component {
  render () {
    return (
      <div className='login-form-container'>
        <form className='text-right'>
          <div className='form-group'>
            <input className='form-control' placeholder='email' />
          </div>

          <div className='form-group'>
            <input className='form-control' placeholder='password' />
          </div>

          <div className='form-group forgot-password'>
            <span>Forgot password?</span>
          </div>

          <button className='pull-right'>
            Login
          </button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {}

export default LoginForm
