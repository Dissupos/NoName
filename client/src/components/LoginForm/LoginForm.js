import React from 'react'
import PropTypes from 'prop-types'
import ButtonWithSpinner from '../ButtonWithSpinner'
import InputMessage from '../InputMessage'
import { AUTH_LOAD_SUCCESS } from '../../constants/AppConstants'

import './LoginForm.scss'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        email: '',
        password: ''
      },
      errors: {
        email: false,
        password: false
      },
      isLoading: false,
      isSent: false
    }

    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  login (e) {
    e.preventDefault()

    let data = this.state.data
    let errors = this.state.errors

    if (data.email && data.password && !errors.email && !errors.password) {
      this.setState({ isLoading: true, isSent: false })
      this.props.actions.login(data)[1]
        .then((result) => {
          this.setState({ isLoading: false, isSent: true })

          if (result.type === AUTH_LOAD_SUCCESS) {
            this.props.onSuccess()
          }
        })
    }
  }

  handleChange (e) {
    let name = e.target.name
    let value = e.target.value
    let valid = e.target.validity.valid

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: !valid
      }
    })
  }

  render () {
    const isLoading = this.state.isLoading

    return (
      <div className='login-form-container'>
        <form className='text-right' onSubmit={this.login}>
          <div className='form-group'>
            <input
              name='email'
              type='email'
              className='form-control'
              disabled={isLoading}
              onChange={this.handleChange}
              value={this.state.data.email}
              placeholder='email'
              required />

            <InputMessage shown={this.state.errors.email}>
              Please enter a valid email address.
            </InputMessage>
          </div>

          <div className='form-group'>
            <input
              name='password'
              type='password'
              className='form-control'
              disabled={isLoading}
              onChange={this.handleChange}
              value={this.state.data.password}
              pattern='.{6,}'
              placeholder='password'
              required />

            <InputMessage shown={this.state.errors.password}>
              Password must be at least 6 characters long.
            </InputMessage>
          </div>

          <div className='form-group forgot-password'>
            <span>Forgot password?</span>
          </div>

          <div className='backend-error'>
            &nbsp;
            {this.state.isSent ? this.props.error : null}
          </div>

          <ButtonWithSpinner className='pull-right' isLoading={isLoading}>
            Login
          </ButtonWithSpinner>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  error: PropTypes.string,
  actions: PropTypes.object
}

export default LoginForm
