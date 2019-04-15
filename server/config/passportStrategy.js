const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userSheme')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

/**
 * passport strategy
 */
passport.use(new LocalStrategy(
  (username, password, cb) => {
    User.findOne({id: username}, (err, user) => {
      if (err) {
        return cb(err, false)
      }

      if (user) {
        user.comparePassword(password, (e, res) => {
          if (e) { return cb(e, false) }

          if (res) {
            return cb(null, user)
          }
        })
      } else {
        return cb(null, false)
      }
    })
  }))

let options = {}
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.TOKKEN || '12873928374hfdvbakhjfe4r34itgnbv'

passport.use(new JWTStrategy(options,
  (jwtPayload, cb) => {
    return cb(null, jwtPayload.id)
  }))
