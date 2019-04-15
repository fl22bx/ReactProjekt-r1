import * as cases from '../../helpers/constants'

/**
 * action delete plan
 *
 * @export
 * @param {any} name
 * @returns
 */
export function deletePlan (data) {
  return {
    type: cases.del,
    payload: data
  }
}
