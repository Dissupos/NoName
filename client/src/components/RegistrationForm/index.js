import RegistrationForm from './RegistrationForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { register } from '../../reducers/AuthReducer'

const mapActionCreators = (dispatch) => ({
  actions: bindActionCreators({
    register
  }, dispatch)
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapActionCreators)(RegistrationForm)
