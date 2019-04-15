import * as cases from '../../helpers/constants'

/**
 * action online users
 *
 * @export
 * @param {any} name
 * @returns
 */
export function setOnlineUsers (array) {
  return {
    type: cases.online,
    payload: array
  }
}
