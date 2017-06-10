import React from 'react'
import RegistrationForm from '../../../components/RegistrationForm'
import LoginForm from '../../../components/LoginForm'

import './AuthView.scss'

class AuthView extends React.Component {
  render () {
    return (
      <div className='auth-view'>
        <div className='register-container'>
          <div className='welcome-message'>
            <h1>Welcome</h1>
            <h4>Create new account in noname note app</h4>
          </div>

          <RegistrationForm />
        </div>

        <div className='login-container'>
          <h4>or login with an existing account</h4>

          <LoginForm />
        </div>
      </div>
    )
  }
}

export default AuthView
