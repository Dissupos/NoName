import HomeView from '../components/HomeView'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.get('isAuthenticated')
})

export default connect(mapStateToProps)(HomeView)
