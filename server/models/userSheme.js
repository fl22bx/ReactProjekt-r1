const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt-nodejs')

/**
 * Moongoose model for user
 */
let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true

  },
  password: {
    type: String,
    required: true
  },
  profileImg: {
    type: String
  },
  headerImg: {
    type: String
  },
  friends: {
    type: Array
  },
  packs: {
    type: Array
  },
  friendrequest: {
    type: Array
  }

})

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function (next) {
  let user = this
  bcrypt.genSalt(10, (e, salt) => {
    if (e) { return next(e) }

    bcrypt.hash(user.password, salt, null, (e, hash) => {
      if (e) { return next(e) }

      user.password = hash
      next()
    })
  })
})

/**
 * compares the passwords
 */

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (e, res) => {
    if (e) { return callback(e) }

    callback(null, res)
  })
}

let User = mongoose.model('User', userSchema)

module.exports = User
