const jwt = require('jsonwebtoken')
const secret = process.env.TOKKEN
// const passport = require('passport')

const userRepository = require('../repository/users')
/**
 * Conrtoller, Create new user
 *
 * @param {any} req request
 * @param {any} resp Response
 */
async function createUser (req, resp) {
  try {
    await userRepository.newUser(req.body.data.email, req.body.data.username, req.body.data.password)
    resp.redirect('/')
  } catch (error) {
    if (error.errors.email) {
      resp.status(400).send({error: 'E-Posten verkar redan existera i vårt system'})
    } else if (error.errors.username) {
      resp.status(400).send({error: 'Användarnamnet är redan upptaget'})
    } else {
      resp.status(400).send({error: 'Något verkar ha gått fel, Vänligen försök igen om en Stund'})
    }
  }
}

/**
 * Controller, log in logic
 *
 * @param {any} req
 * @param {any} resp
 */
async function logIn (req, resp) {
  let user = await userRepository.getUser(req.body.username)
  if (user) {
    user.comparePassword(req.body.password, (e, res) => {
      if (e) { resp.status(400).send({error: 'Kunde Tyvärr inte logga in Vänligen försök igen eller kom tillbaka vi ett senare tillfälle'}) }

      if (res) {
        const token = jwt.sign({
          user: req.body.username
        }, secret)
        resp.json({token})
      } else {
        resp.status(400).send({error: 'Lösenordet eller användarnamnet överstämmer ej'})
      }
    })
  } else {
    resp.status(400).send({error: 'Användaren finns tyvärr inte i vårt system'})
  }
}

module.exports = {
  createUser,
  logIn
}
