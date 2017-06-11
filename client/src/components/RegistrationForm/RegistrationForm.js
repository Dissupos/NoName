import React from 'react'
import PropTypes from 'prop-types'

import './RegistrationForm.scss'
import { AUTH_LOAD_SUCCESS } from '../../constants/AppConstants';

class RegistrationForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        regName: '',
        regEmail: '',
        regPassword: ''
      },
      isLoading: false
    }

    this.register = this.register.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  register (e) {
    e.preventDefault()

    let data = this.state.data

    if (data.regName && data.regEmail && data.regPassword) {
      this.setState({ isLoading: true })
      this.props.actions.register({
        name: data.regName,
        email: data.regEmail,
        password: data.regPassword
      })[1].then((result) => {
        this.setState({ isLoading: false })

        if (result.type === AUTH_LOAD_SUCCESS) {
          this.props.onSuccess()
        }
      })
    }
  }

  handleChange (e) {
    let id = e.target.id
    let value = e.target.value

    this.setState({
      data: {
        ...this.state.data,
        [id]: value
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
              id='regName'
              type='text'
              className='form-control'
              disabled={isLoading}
              onChange={this.handleChange}
              value={this.state.data.regName}
              placeholder='name'
              required />
          </div>

          <div className='form-group'>
            <input
              id='regEmail'
              type='email'
              className='form-control'
              disabled={isLoading}
              onChange={this.handleChange}
              value={this.state.data.regEmail}
              placeholder='email'
              required />
          </div>

          <div className='form-group'>
            <input
              id='regPassword'
              type='password'
              className='form-control'
              disabled={isLoading}
              onChange={this.handleChange}
              value={this.state.data.regPassword}
              placeholder='password'
              required />
          </div>

          <button disabled={isLoading}>
            {isLoading && (
              <div className='overlay'>
                <i className='fa fa-spinner fa-pulse' />
              </div>
            )}
            Register
          </button>
        </form>
      </div>
    )
  }
}

RegistrationForm.propTypes = {
  actions: PropTypes.object,
  onSuccess: PropTypes.func.isRequired
}

export default RegistrationForm
