import React from 'react'
import Sidebar from '../../../components/Sidebar'
import Editor from '../../../components/Editor'

import './HomeView.scss'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='home-view'>
        <Sidebar />
        <Editor />
      </div>
    )
  }
}

export default HomeView
