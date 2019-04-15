import * as cases from '../../helpers/constants'

/**
 * sets new pack
 *
 * @export
 * @param {any} name
 * @returns
 */
export function newPack (data) {
  return {
    type: cases.newPack,
    payload: data
  }
}
