import React from 'react'
import PropTypes from 'prop-types'
import Subsidebar from '../Subsidebar'
import logoSvg from './logo.svg'

import './Sidebar.scss'

class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.logout = this.logout.bind(this)
    this.openCategory = this.openCategory.bind(this)
  }

  openCategory (tag) {
    this.props.actions.selectTag(tag)
  }

  logout () {
    this.props.actions.logout()
    this.context.router.push('/auth')
  }

  render () {
    return (
      <div>
        <div className='sidebar-container'>
          <div className='sidebar-content'>

            <div className='logo-container'>
              <img className='logo' src={logoSvg} />
            </div>

            <div className='categories'>
              <div className='item'>
                <i className='fa fa-user-circle-o' />
                Account
              </div>

              <div
                className='item'
                onClick={() => {
                  this.openCategory('all')
                }}>
                <i className='fa fa-sticky-note-o' />
                Notes
              </div>

              <div
                className='item'
                onClick={() => {
                  this.logout()
                }}>
                <i className='fa fa-sign-out' />
                Log out
              </div>
            </div>

            <div className='tags'>
              {this.props.tags && this.props.tags.map((val, key) => (
                <div
                  className='tag'
                  key={key}
                  onClick={() => {
                    this.openCategory(val)
                  }}>
                  <i className='fa fa-hashtag' />
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Subsidebar />
      </div>
    )
  }
}

Sidebar.propTypes = {
  tags: PropTypes.object,
  actions: PropTypes.object
}

Sidebar.contextTypes = {
  router: PropTypes.object
}

export default Sidebar
