import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../../components/Sidebar'
import NoteEditor from '../../../components/NoteEditor'

import './HomeView.scss'

class HomeView extends React.Component {
  componentWillMount () {
    if (!this.props.isAuthenticated) {
      this.context.router.push('/auth')
    }
  }

  render () {
    return (
      <div className='home-view'>
        <Sidebar />
        <NoteEditor />
      </div>
    )
  }
}

HomeView.propTypes = {
  isAuthenticated: PropTypes.bool
}

HomeView.contextTypes = {
  router: PropTypes.object
}

export default HomeView
