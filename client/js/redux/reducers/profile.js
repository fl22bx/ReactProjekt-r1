
import * as cases from '../../helpers/constants'
/**
 * Reducer for profile
 *
 * @param {any} action
 * @returns
 */
export default function reducer (state = {
  profileImgUrl: null
}, action) {
  switch (action.type) {
    case cases.setProfileImg: {
      return {...state, profileImgUrl: action.payload}
    }
    default:
      return state
  }
}
