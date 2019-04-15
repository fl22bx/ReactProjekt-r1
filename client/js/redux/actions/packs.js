import * as cases from '../../helpers/constants'

/**
 * action all plans
 *
 * @export
 * @param {any} name
 * @returns
 */
export function setPacks (data) {
  return {
    type: cases.fetchPacks,
    payload: data
  }
}
