import * as cases from '../../helpers/constants'

/**
 * friendsrequest action
 *
 * @export
 * @param {any} name
 * @returns
 */
export function notifications (obj) {
  return {
    type: cases.friendRequest,
    payload: obj
  }
}
