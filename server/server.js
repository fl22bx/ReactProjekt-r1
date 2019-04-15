
// Modules
const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const startDB = require('./config/mongoDB')
const passport = require('passport')
const strategy = require('./config/passport')
const port = 8000
const app = express()

const server = http.createServer(app).listen(port, () => {
  console.log('server upp and running on ' + port)
})

const io = require('socket.io')(server)
module.exports = {io}

require('dotenv').config()

// start mongoose
startDB()

// bodyparser
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

// Passport
app.use(passport.initialize())
strategy.passportAuth(passport)

// router
app.use('/', require('./routes/router.js'))

// static files
app.use(express.static(path.join(__dirname, '../client')))

app.use('*', (req, resp) => {
  resp.sendFile(path.resolve(path.join(__dirname, '../client/index.html')))
})

// socket
let connectedUser = []

io.on('connection', (socket) => {
  socket.on('USER_CONNECTED', (data) => {
    connectedUser.push({name: data.username.user, socketID: socket.id})
    socket.broadcast.emit('USER_CONNECTED', connectedUser)
    socket.emit('USER_CONNECTED', connectedUser)
  })

  socket.on('NEW_TREKK', (data) => {
    let tmp = data.data
    socket.to(data.socketid).emit('NEW_TREKK', tmp)
  })
  socket.on('NEW_TREKK_SELF', (data) => {
    socket.emit('NEW_TREKK', data)
  })

  socket.on('TAKE_RESP', (data) => {
    let tmp = data.data
    socket.to(data.socketid).emit('TAKE_RESP', tmp)
  })
  socket.on('TAKE_RESP_SELF', (data) => {
    socket.emit('TAKE_RESP_SELF', data)
  })

  socket.on('DELETE_ITEM', (data) => {
    let tmp = data.data
    socket.to(data.socketid).emit('DELETE_ITEM', tmp)
  })
  socket.on('DELETE_ITEM_SELF', (data) => {
    socket.emit('DELETE_ITEM_SELF', data)
  })

  socket.on('ADDITEM', (data) => {
    let tmp = data.data
    socket.to(data.socketid).emit('ADDITEM', tmp)
  })
  socket.on('ADDITEM_SELF', (data) => {
    socket.emit('ADDITEM_SELF', data)
  })

  socket.on('DELETE_PLAN', (data) => {
    let tmp = data.data
    socket.to(data.socketid).emit('DELETE_PLAN', tmp)
  })
  socket.on('DELETE_PLAN_SELF', (data) => {
    socket.emit('DELETE_PLAN', data)
  })
})

module.exports = app
