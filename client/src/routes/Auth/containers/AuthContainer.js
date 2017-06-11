import AuthView from '../components/AuthView'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.get('isAuthenticated')
})

export default connect(mapStateToProps)(AuthView)
