import axios from 'axios'
import authToken from '../../helpers/authToken'
import jwt from 'jsonwebtoken'
import { dispatchFlash } from '../../redux/actions/flash'
import { setUserName } from '../../redux/actions/user'
const authUrl = '/api/user/login'

/**
 * Dispatches login request
 *
 * @export
 * @param {any} data
 * @returns
 */
export function login (data) {
  return dispatch => {
    return axios.post(authUrl, data).then(
      resp => {
        window.localStorage.setItem('jwtToken', resp.data.token)
        authToken(resp.data.token)
        dispatch(
          setUserName(jwt.decode(window.localStorage.jwtToken))
        )
      },
      (e) => dispatchFlash(e.response.data.error, 'error'))
  }
}
