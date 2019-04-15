const mongoose = require('mongoose')

/**
 * Mongoose model for Plan
 */
let planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true

  },
  distance: {
    type: String
  },
  pack: {
    type: Array
  },
  creator: {
    type: String
  },
  users: {
    type: Array
  },
  id: {
    type: String,
    unique: true
  }
})

let Plan = mongoose.model('Plan', planSchema)

module.exports = Plan
