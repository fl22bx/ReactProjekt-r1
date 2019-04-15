
import * as cases from '../../helpers/constants'
/**
 * Reducer for plans
 *
 * @param {any} action
 * @returns
 */
export default function reducer (state = {
  packs: []
}, action) {
  switch (action.type) {
    case cases.fetchPacks: {
      return {...state, packs: action.payload}
    }
    case cases.newPack: {
      return {...state, packs: [...state.packs, action.payload]}
    }
    case cases.resp: {
      let clone = JSON.parse(JSON.stringify(state.packs))
      clone.forEach(element => {
        if (element.id === action.payload.id) {
          element.pack.forEach(item => {
            if (item.id === action.payload.Packid) {
              item.resp = action.payload.user
            }
          })
        }
      })

      return {...state, packs: clone}
    }
    case cases.deleteItem: {
      let clone = JSON.parse(JSON.stringify(state.packs))
      clone.forEach(element => {
        if (element.id === action.payload.id) {
          element.pack.forEach((item, index, object) => {
            if (item.id === action.payload.Packid) {
              object.splice(index, 1)
            }
          })
        }
      })

      return {...state, packs: clone}
    }
    case cases.add: {
      let clone = JSON.parse(JSON.stringify(state.packs))
      clone.forEach(element => {
        if (element.id === action.payload.id) {
          element.pack.push(action.payload.add)
        }
      })

      return {...state, packs: clone}
    }
    case cases.del: {
      let clone = JSON.parse(JSON.stringify(state.packs))
      clone.forEach((element, index, object) => {
        if (element.id === action.payload.id) {
          object.splice(index, 1)
        }
      })
      return {...state, packs: clone}
    }

    default:
      return state
  }
}
