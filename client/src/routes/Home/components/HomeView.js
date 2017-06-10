import React from 'react'
import Sidebar from '../../../components/Sidebar'
import NoteEditor from '../../../components/NoteEditor'

import './HomeView.scss'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
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

export default HomeView
