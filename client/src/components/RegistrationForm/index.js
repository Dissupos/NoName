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
  errors: state.authReducer.get('registrationErrors') && state.authReducer.get('registrationErrors').toJS()
})

export default connect(mapStateToProps, mapActionCreators)(RegistrationForm)
