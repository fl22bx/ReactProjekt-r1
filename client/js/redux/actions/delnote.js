import * as cases from '../../helpers/constants'

/**
 * delete notification action
 *
 * @export
 * @param {any} name
 * @returns
 */
export function delnote (data) {
  return {
    type: cases.delNote,
    payload: data
  }
}
