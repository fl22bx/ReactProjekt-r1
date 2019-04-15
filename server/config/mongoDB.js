let DbConnectionString = process.env.DB || 'mongodb://dev:dev1234@ds231549.mlab.com:31549/devdb'

const mongoose = require('mongoose')
/**
 * Starts the Mongose database
 *
 */
function startDB () {
  mongoose.connect(DbConnectionString)
  let db = mongoose.connection

  db.on('connected', () => {
    console.log('Database is running')
  })

}

module.exports = startDB
