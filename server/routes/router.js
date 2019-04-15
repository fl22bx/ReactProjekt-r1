
const routes = require('express').Router()
const logInController = require('../controllers/logInController')
const user = require('../controllers/user')
const packController = require('../controllers/pack')
const fileUpploadController = require('../controllers/fileUpploadController')
const data = require('../controllers/data')
const passport = require('passport')

/**
 * Route to controller
 *
 */
routes.route('/api/user/signup')
  .post((req, resp) => { logInController.createUser(req, resp) })

routes.post('/api/user/login', (req, resp) => {
  logInController.logIn(req, resp)
})

routes.post('/api/planner/plan', passport.authenticate('jwt', {session: false}), (req, resp) => {
  packController.pack(req, resp)
})

routes.post('/api/header/img', passport.authenticate('jwt', {session: false}), (req, resp) => {
  fileUpploadController.img(req, resp)
})

routes.get('/api/data', passport.authenticate('jwt', {session: false}), (req, resp) => {
  data.data(req, resp)
})

routes.post('/api/trekk/takeresp', passport.authenticate('jwt', {session: false}), (req, resp) => {
  packController.takeResp(req, resp)
})

routes.post('/api/trekk/deleteItem', passport.authenticate('jwt', {session: false}), (req, resp) => {
  packController.deleteitem(req, resp)
})

routes.post('/api/friend', passport.authenticate('jwt', {session: false}), (req, resp) => {
  user.befriend(req, resp)
})

routes.post('/api/acceptfriend', passport.authenticate('jwt', {session: false}), (req, resp) => {
  user.accept(req, resp)
})

routes.post('/api/trekk/addPack', passport.authenticate('jwt', {session: false}), (req, resp) => {
  packController.addItemToexisting(req, resp)
})

routes.post('/api/trekk/deletePlan', passport.authenticate('jwt', {session: false}), (req, resp) => {
  packController.deletePlan(req, resp)
})

module.exports = routes
