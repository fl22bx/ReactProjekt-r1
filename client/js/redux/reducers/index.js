import { combineReducers } from 'redux'
import user from './userReducer'
import flash from './flash'
import profile from './profile'
import data from './data'
import friends from './friends'
import packs from './packs'
import notifications from './notifications'
import socket from './realtime'

/**
 * Combines reducers
 */
export default combineReducers({
  user: user,
  flash: flash,
  profile: profile,
  data: data,
  friends: friends,
  packs: packs,
  notifications: notifications,
  socket: socket
})
