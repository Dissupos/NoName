import React from 'react'
import PropTypes from 'prop-types'
import ButtonWithSpinner from '../ButtonWithSpinner'
import InputMessage from '../InputMessage'
import { AUTH_LOAD_SUCCESS } from '../../constants/AppConstants'

import './RegistrationForm.scss'

class RegistrationForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        name: '',
        email: '',
        password: ''
      },
      errors: {
        name: false,
        email: false,
        password: false
      },
      isLoading: false,
      isSent: false
    }

    this.register = this.register.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  register (e) {
    e.preventDefault()

    let data = this.state.data
    let errors = this.state.errors

    if (data.name && data.email && data.password && !errors.name && !errors.email && !errors.password) {
      this.setState({ isLoading: true, isSent: false })
      this.props.actions.register(data)[1].then((result) => {
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
      <div className='registration-form-container'>
        <form onSubmit={this.register}>
          <div className='form-group'>
            <input
              name='name'
              type='text'
              className='form-control'
              disabled={isLoading}
              onChange={this.handleChange}
              value={this.state.data.regName}
              placeholder='name'
              pattern='.{1,255}'
              required />

            <InputMessage shown={this.state.errors.name}>
              Name field is required.
            </InputMessage>
          </div>

          <div className='form-group'>
            <input
              name='email'
              type='email'
              className='form-control'
              disabled={isLoading}
              onChange={this.handleChange}
              value={this.state.data.regEmail}
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
              value={this.state.data.regPassword}
              placeholder='password'
              pattern='.{6,}'
              required />

            <InputMessage shown={this.state.errors.password}>
              Password must be at least 6 characters long.
            </InputMessage>
          </div>

          <div className='backend-error'>
            &nbsp;
            {this.state.isSent && Array.isArray(this.props.errors) ? this.props.errors[0] : null}
          </div>

          <ButtonWithSpinner isLoading={isLoading}>
            Register
          </ButtonWithSpinner>
        </form>
      </div>
    )
  }
}

RegistrationForm.propTypes = {
  actions: PropTypes.object,
  errors: PropTypes.array,
  onSuccess: PropTypes.func.isRequired
}

export default RegistrationForm
