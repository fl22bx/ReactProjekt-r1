
import * as cases from '../../helpers/constants'

/**
 * Reducer for notifications
 *
 * @param {any} action
 * @returns
 */
export default function reducer (state = {
  friendrequest: [],
  resp: [],
  addnot: [],
  delNote: []
}, action) {
  switch (action.type) {
    case cases.friendRequest: {
      return {...state, friendrequest: action.payload}
    }
    case cases.respNote: {
      return {...state, resp: [...state.resp, action.payload]}
    }
    case cases.addnote: {
      return {...state, addnot: [...state.addnot, action.payload]}
    }
    case cases.delNote: {
      return { ...state, delNote: [...state.delNote, action.payload] }
    }
    case cases.emtyNote: {
      return { ...state, resp: [], addnot: [], friendrequest: [], delNote: [] }
    }

    default:
      return state
  }
}
