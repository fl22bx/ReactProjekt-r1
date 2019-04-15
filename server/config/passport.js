const passport = require('passport-jwt')
const User = require('../models/userSheme')
const JwtStrategy = passport.Strategy
const ExtractJwt = passport.ExtractJwt
/**
 * Passport package with JWT Strategy
 *
 * @param {any} passport
 */
function passportAuth (passport) {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = process.env.TOKKEN

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({username: jwtPayload.user}, (err, user) => {
      if (err) {
        return done(err, false)
      }

      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }))
}

module.exports = {
  passportAuth
}
