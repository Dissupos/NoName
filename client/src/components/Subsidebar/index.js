import Subsidebar from './Subsidebar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectNote, addNote, selectTag } from '../../reducers/NoteReducer'

const mapActionCreators = (dispatch) => ({
  actions: bindActionCreators({
    selectNote,
    addNote,
    selectTag
  }, dispatch)
})

const mapStateToProps = (state) => ({
  selectedNote: state.noteReducer.get('selectedNote'),
  notes: state.noteReducer.get('notes'),
  selectedTag: state.noteReducer.get('selectedTag')
})

export default connect(mapStateToProps, mapActionCreators)(Subsidebar)
