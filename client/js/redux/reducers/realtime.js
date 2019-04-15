
import * as cases from '../../helpers/constants'
/**
 * Reducer for realtime
 *
 * @param {any} action
 * @returns
 */
export default function reducer (state = {
  socket: null,
  online: []
}, action) {
  switch (action.type) {
    case cases.socket: {
      return {...state, socket: action.payload}
    }
    case cases.online: {
      return {...state, online: action.payload}
    }
    default:
      return state
  }
}
