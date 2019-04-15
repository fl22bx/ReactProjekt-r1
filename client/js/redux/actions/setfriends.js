import * as cases from '../../helpers/constants'

/**
 * sets friends action
 *
 * @export
 * @param {any} name
 * @returns
 */
export function setFriends (friends) {
  return {
    type: cases.friends,
    payload: friends
  }
}
