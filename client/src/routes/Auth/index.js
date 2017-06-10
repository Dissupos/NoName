export default (store) => ({
  path: 'auth',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Auth = require('./components/AuthView').default
      cb(null, Auth)
    }, 'profile')
  }
})
