import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../../reducers/AuthReducer'

const mapActionCreators = (dispatch) => ({
  actions: bindActionCreators({
    login
  }, dispatch)
})

const mapStateToProps = (state) => ({
  error: state.authReducer.get('loginError')
})

export default connect(mapStateToProps, mapActionCreators)(LoginForm)
