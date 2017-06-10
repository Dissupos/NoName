import NoteEditor from './NoteEditor.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { saveNote } from '../../reducers/NoteReducer';

const mapStateToProps = (state) => ({
  selectedNote: state.noteReducer.get('selectedNote'),
  selectedTag: state.noteReducer.get('selectedTag')
})

const mapActionCreators = (dispatch) => ({
  actions: bindActionCreators({
    saveNote
  }, dispatch)
})

export default connect(mapStateToProps, mapActionCreators)(NoteEditor)
