import React from 'react'
import PropTypes from 'prop-types'
import Subsidebar from '../Subsidebar'
import logoSvg from './logo.svg'

import './Sidebar.scss'

class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.openCategory = this.openCategory.bind(this)
  }

  openCategory (tag) {
    this.props.actions.selectTag(tag)
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

        <Subsidebar tag={this.props.selectedTag} />
      </div>
    )
  }
}

Sidebar.propTypes = {
  tags: PropTypes.array,
  actions: PropTypes.object,
  selectedTag: PropTypes.any
}

export default Sidebar
