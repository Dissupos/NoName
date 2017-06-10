import Editor from './Editor.js'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  selectedNote: state.noteReducer.selectedNote,
  selectedTag: state.noteReducer.selectedTag
})

export default connect(mapStateToProps)(Editor)
