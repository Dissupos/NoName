import Sidebar from './Sidebar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectTag } from '../../reducers/NoteReducer'
import { logout } from '../../reducers/AuthReducer'

const mapActionCreators = (dispatch) => ({
  actions: bindActionCreators({
    selectTag,
    logout
  }, dispatch)
})

const mapStateToProps = (state) => ({
  selectedTag: state.noteReducer.get('selectedTag'),
  tags: state.noteReducer.get('tags')
})

export default connect(mapStateToProps, mapActionCreators)(Sidebar)
