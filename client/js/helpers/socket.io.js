
// import socketAction from '../redux/actions/realtime'
import {setOnlineUsers} from '../redux/actions/onlineusers'
import {newPack} from '../redux/actions/newPack'
import {takeResp} from '../redux/actions/rakeResp'
import {deleteItem} from '../redux/actions/deletePackItem'
import {respNote} from '../redux/actions/respNote'
import {addnote} from '../redux/actions/addnote'
import {add} from '../redux/actions/add'
import {deletePlan} from '../redux/actions/delete'
import {delnote} from '../redux/actions//delnote'

/**
 * Websocket handeler
 *
 * @export
 * @param {any} socket
 * @param {any} store
 * @param {any} username
 */
export function startIo (socket, store, username) {
  socket.on('connect', (data) => {
    console.log('websocket up and running')
  })

  socket.emit('USER_CONNECTED', {username})

  socket.on('USER_CONNECTED', (data) => {
    store.dispatch(setOnlineUsers(data))
  })

  socket.on('NEW_TREKK', (data) => {
    store.dispatch(newPack(data))
  })

  socket.on('TAKE_RESP', (data) => {
    store.dispatch(takeResp(data))
    store.dispatch(respNote(data))
  })

  socket.on('TAKE_RESP_SELF', (data) => {
    store.dispatch(takeResp(data))
  })

  socket.on('DELETE_ITEM', (data) => {
    store.dispatch(deleteItem(data))
  })

  socket.on('DELETE_ITEM_SELF', (data) => {
    store.dispatch(deleteItem(data))
  })

  socket.on('ADDITEM', (data) => {
    store.dispatch(add(data))
    store.dispatch(addnote(data))
  })

  socket.on('ADDITEM_SELF', (data) => {
    store.dispatch(add(data))
  })

  socket.on('DELETE_PLAN', (data) => {
    store.dispatch(deletePlan(data))
    store.dispatch(delnote(data))
  })

  socket.on('DELETE_PLAN_SELF', (data) => {
    store.dispatch(deletePlan(data))
  })
}

/**
 * Socket emit for new Trekk
 *
 * @export
 * @param {any} socket
 * @param {any} sender
 * @param {any} connectedUsers
 * @param {any} data
 */
export function newTrekk (socket, sender, connectedUsers, data) {
  let tmpData = {
    name: data.name,
    date: data.date,
    distance: data.trekk,
    pack: data.pack,
    creator: data.creator,
    users: data.users,
    id: data.id
  }
  data.users.forEach(reciver => {
    connectedUsers.forEach(user => {
      if (reciver.name === user.name) {
        let socketid = user.socketID
        let tmp = {socketid: socketid, data: tmpData}
        socket.emit('NEW_TREKK', tmp)
      }
    })
  })
  socket.emit('NEW_TREKK_SELF', data)
}

/**
 * Socket emit for taking responsibility
 *
 * @export
 * @param {any} socket
 * @param {any} sender
 * @param {any} connectedUsers
 * @param {any} participants
 * @param {any} data
 */
export function takeresp (socket, sender, connectedUsers, participants, data) {
  participants.forEach(reciver => {
    connectedUsers.forEach(user => {
      if (reciver.name === user.name) {
        let socketid = user.socketID
        let tmp = {socketid: socketid, data: data}
        socket.emit('TAKE_RESP', tmp)
      }
    })
  })

  socket.emit('TAKE_RESP_SELF', data)
}

/**
 * socket emit for deleting
 *
 * @export
 * @param {any} socket
 * @param {any} sender
 * @param {any} connectedUsers
 * @param {any} participants
 * @param {any} data
 */
export function deleteItemRealTime (socket, sender, connectedUsers, participants, data) {
  participants.forEach(reciver => {
    connectedUsers.forEach(user => {
      if (reciver.name === user.name) {
        let socketid = user.socketID
        let tmp = {socketid: socketid, data: data}
        socket.emit('DELETE_ITEM', tmp)
      }
    })
  })

  socket.emit('DELETE_ITEM_SELF', data)
}

/**
 * socket emit fr adding pack
 *
 * @export
 * @param {any} socket
 * @param {any} sender
 * @param {any} connectedUsers
 * @param {any} participants
 * @param {any} data
 */
export function addPack (socket, sender, connectedUsers, participants, data) {
  participants.forEach(reciver => {
    connectedUsers.forEach(user => {
      if (reciver.name === user.name) {
        let socketid = user.socketID
        let tmp = {socketid: socketid, data: data}
        socket.emit('ADDITEM', tmp)
      }
    })
  })

  socket.emit('ADDITEM_SELF', data)
}

/**
 * socket emit for deleting plan
 *
 * @export
 * @param {any} socket
 * @param {any} sender
 * @param {any} connectedUsers
 * @param {any} participants
 * @param {any} data
 */
export function deletePlanRealTime (socket, sender, connectedUsers, participants, data) {
  participants.forEach(reciver => {
    connectedUsers.forEach(user => {
      if (reciver.name === user.name) {
        let socketid = user.socketID
        let tmp = {socketid: socketid, data: data}
        socket.emit('DELETE_PLAN', tmp)
      }
    })
  })

  socket.emit('DELETE_PLAN_SELF', data)
}
