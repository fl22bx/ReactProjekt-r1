import store from '../../store'
/**
 * Redux, Dispatches flashmessage
 *
 * @export
 * @param {any} msg
 * @param {any} flashType
 */
export function dispatchFlash (msg, flashType) {
  store.dispatch({
    type: 'SET_FLASH_MSG',
    msg: msg,
    flashType: flashType
  })
}
