
import * as cases from '../../helpers/constants'
/**
 * Reducer if data is fetched
 *
 * @param {any} action
 * @returns
 */
export default function reducer (state = {
  fetched: false
}, action) {
  switch (action.type) {
    case cases.datafetched: {
      return {...state, fetched: action.payload}
    }
    default:
      return state
  }
}
