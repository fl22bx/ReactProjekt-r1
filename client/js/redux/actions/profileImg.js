import * as cases from '../../helpers/constants'

/**
 * action profile img
 *
 * @export
 * @param {any} url
 * @returns
 */
export function setProfileImg (url) {
  return {
    type: cases.setProfileImg,
    payload: url
  }
}
