import axios from 'axios'

/**
 * Sets AuthTokken to every req
 *
 * @export
 * @param {any} token
 */
export default function authToken (token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
