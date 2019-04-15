import * as cases from '../../helpers/constants'

/**
 * Action take responisbility
 *
 * @export
 * @param {any} name
 * @returns
 */
export function takeResp (data) {
  return {
    type: cases.resp,
    payload: data
  }
}
