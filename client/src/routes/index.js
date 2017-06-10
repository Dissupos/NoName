import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home
})

export default createRoutes
