import React from 'react'
import PropTypes from 'prop-types'
import RegistrationForm from '../../../components/RegistrationForm'
import LoginForm from '../../../components/LoginForm'

import './AuthView.scss'

class AuthView extends React.Component {
  constructor (props) {
    super(props)

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentWillMount () {
    if (this.props.isAuthenticated) {
      this.context.router.push('/')
    }
  }

  handleSuccess () {
    this.context.router.push('/')
  }

  render () {
    return (
      <div className='auth-view'>
        <div className='register-container'>
          <div className='welcome-message'>
            <h1>Welcome</h1>
            <h4>Create new account in noname note app</h4>
          </div>

          <RegistrationForm onSuccess={this.handleSuccess} />
        </div>

        <div className='login-container'>
          <h4>or login with an existing account</h4>

          <LoginForm onSuccess={this.handleSuccess} />
        </div>
      </div>
    )
  }
}

AuthView.contextTypes = {
  router: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

export default AuthView
