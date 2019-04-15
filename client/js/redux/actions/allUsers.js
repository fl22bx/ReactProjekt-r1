import * as cases from '../../helpers/constants'

/**
 * Action set all users
 *
 * @export
 * @param {any} name
 * @returns
 */
export function setAllUsers (allUsers) {
  return {
    type: cases.getAllUsers,
    payload: allUsers
  }
}
