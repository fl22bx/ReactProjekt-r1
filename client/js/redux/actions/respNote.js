import * as cases from '../../helpers/constants'

/**
 * responsibility action
 *
 * @export
 * @param {any} name
 * @returns
 */
export function respNote (data) {
  return {
    type: cases.respNote,
    payload: data
  }
}
