import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import Auth from './Auth'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes: [
    Auth(store)
  ]
})

export default createRoutes
