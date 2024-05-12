const user = require('./user')

// CHANNEL 3

const initRoutes = (app) => {
  app.use('/api/v1/user', user)
  return app.use('/', (req, res, next) => {
    return res.send('SERVER ON!!!')
  })
}
module.exports = initRoutes