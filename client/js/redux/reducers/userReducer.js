import * as cases from '../../helpers/constants'
const Authenticated = (user) => {
  return user.length > 0
}
/**
 * Reducer for setting user
 *
 *
 * @param {any} action
 * @returns
 */
export default function reducer (state = {
  user: '',
  Authenticated: false
}, action) {
  switch (action.type) {
    case cases.setUser: {
      return {...state, user: action.payload.user, Authenticated: Authenticated(action.payload.user)}
    }
    default:
      return state
  }
}
