const userRepository = require('../repository/users')

/**
 * controller friends request
 *
 * @param {any} req
 * @param {any} resp
 */
async function befriend (req, resp) {
  userRepository.befriend(req.body.data)
  resp.status(200)
}

/**
 * controller accept friendrequest
 *
 * @param {any} req
 * @param {any} resp
 */
async function accept (req, resp) {
  userRepository.accept(req.body.data)
  resp.status(200)
}
module.exports = {
  befriend,
  accept
}
