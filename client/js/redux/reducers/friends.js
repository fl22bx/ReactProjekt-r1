
import * as cases from '../../helpers/constants'
/**
 * Reducer for friends
 *
 * @param {any} action
 * @returns
 */
export default function reducer (state = {
  friends: [],
  allUsers: []
}, action) {
  switch (action.type) {
    case cases.getAllUsers: {
      return {...state, allUsers: action.payload}
    }
    case cases.friends: {
      return {...state, friends: action.payload}
    }
    default:
      return state
  }
}
