import { LOGGED_OUT, ACCOUNT_CHANGED } from '../actions'
import {
  UNITS_FETCHED,
  UNIT_CREATED,
  UNIT_UPDATED,
  UNIT_REMOVED
} from '../actions/types'
import { mapKeys } from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case UNITS_FETCHED:
      return mapKeys(action.payload, '_id')

    case UNIT_CREATED:
      return { ...state, [action.payload._id]: action.payload }

    case UNIT_UPDATED:
      let temp = { ...state }
      temp[action.payload._id] = action.payload
      return temp

    case UNIT_REMOVED:
      const { [action.payload._id]: _, ...units } = state
      return units

    case ACCOUNT_CHANGED:
    case LOGGED_OUT:
      return {}

    default:
      return state
  }
}
