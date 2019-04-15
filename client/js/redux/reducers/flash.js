import * as cases from '../../helpers/constants'
/**
 * Reducer for flashmessage
 *
 * @param {any} action
 * @returns
 */
export default function reducer (state = {
  flashType: '',
  msg: ''
}, action) {
  switch (action.type) {
    case 'SET_FLASH_MSG': {
      return {...state, msg: action.msg, flashType: action.flashType}
    }
    case cases.emty: {
      return {...state, msg: '', flashType: ''}
    }
    default:
      return state
  }
}
