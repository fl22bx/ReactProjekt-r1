import * as cases from '../../helpers/constants'

/**
 * set socket adress
 *
 * @export
 * @param {any} name
 * @returns
 */

export function setSocket (socket) {
  return {
    type: cases.socket,
    payload: socket
  }
}
