import * as cases from '../../helpers/constants'

/**
 * sdelete pack item action
 *
 * @export
 * @param {any} name
 * @returns
 */
export function deleteItem (pack) {
  return {
    type: cases.deleteItem,
    payload: pack
  }
}
