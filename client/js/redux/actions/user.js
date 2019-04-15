import * as cases from '../../helpers/constants'

/**
 * sets user name in storage
 *
 * @export
 * @param {any} name
 * @returns
 */
export function setUserName (name) {
  return {
    type: cases.setUser,
    payload: name
  }
}
