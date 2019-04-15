import * as cases from '../../helpers/constants'

/**
 * sets if data is fetched
 *
 * @export
 * @param {any} name
 * @returns
 */
export function datafetched (bool) {
  return {
    type: cases.datafetched,
    payload: bool
  }
}
