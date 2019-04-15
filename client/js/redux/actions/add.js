import * as cases from '../../helpers/constants'

/**
 * action add
 *
 * @export
 * @param {any} name
 * @returns
 */
export function add (data) {
  return {
    type: cases.add,
    payload: data
  }
}
