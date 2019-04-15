import * as cases from '../../helpers/constants'

/**
 * action add notification
 *
 * @export
 * @param {any} name
 * @returns
 */
export function addnote (data) {
  return {
    type: cases.addnote,
    payload: data
  }
}
