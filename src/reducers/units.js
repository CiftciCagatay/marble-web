import { UNITS_FETCHED, LOGGED_OUT, ACCOUNT_CHANGED } from '../actions'
import { mapKeys } from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case UNITS_FETCHED:
      return mapKeys(action.payload, '_id')

    case ACCOUNT_CHANGED:
    case LOGGED_OUT:
      return {}

    default:
      return state
  }
}
