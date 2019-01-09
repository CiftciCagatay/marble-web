import {
  NOTIFICATIONS_FETCHED,
  NOTIFICATIONS_UPDATED,
  LOGGED_OUT
} from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case NOTIFICATIONS_FETCHED:
      return _.mapKeys(action.payload, '_id')
    case NOTIFICATIONS_UPDATED:
      let newState = { ...state }
      const ids = action.payload

      ids.map(id => (newState[id].read = true))

      return newState
    case LOGGED_OUT:
      return []
    default:
      return state
  }
}
