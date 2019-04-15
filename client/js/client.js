import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import authToken from './helpers/authToken'
import jwt from 'jsonwebtoken'
import { setUserName } from './redux/actions/user'
import { startIo } from '../js/helpers/socket.io'
import {setSocket} from './redux/actions/realtime'
let io = require('socket.io-client')

require('../style/style.scss')

// sends authTokken to every request
authToken(window.localStorage.jwtToken)
if (window.localStorage.jwtToken) {
  let username = jwt.decode(window.localStorage.jwtToken)
  store.dispatch(setUserName(username))

  var socket = io()
  startIo(socket, store, username)
  store.dispatch(setSocket(socket))
}

render(
  <Provider store={store}>

    <App />
  </Provider>
  , document.getElementById('root'))
