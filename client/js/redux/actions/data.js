import axios from 'axios'
import { setAllUsers } from '../actions/allUsers'
import { setProfileImg } from '../actions/profileImg'
import { setPacks } from '../actions/packs'
import { setFriends } from '../actions/setfriends'
import { datafetched } from '../actions/datafetched'
import { notifications } from '../actions/notifications'
const url = '/api/data'

/**
 * fetch all data
 *
 * @export
 * @param {any} data
 * @returns
 */
export function getData (data) {
  return dispatch => {
    return axios.get(url).then(
      resp => {
        let obj = JSON.parse(resp.data)
        dispatch(setProfileImg(obj.profileImg))
        dispatch(setAllUsers(obj.allUsers))
        dispatch(setPacks(obj.packs))
        dispatch(notifications(obj.request))
        dispatch(setFriends(obj.friends))
        dispatch(datafetched(true))
      })
  }
}
