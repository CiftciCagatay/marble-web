import { LOGGED_OUT, ACCOUNT_CHANGED } from '../actions'
import {
  CATEGORIES_FETCHED,
  CATEGORY_CREATED,
  CATEGORY_UPDATED,
  CATEGORY_REMOVED
} from '../actions/types'
import { mapKeys } from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case CATEGORIES_FETCHED:
      return mapKeys(action.payload, '_id')

    case CATEGORY_CREATED:
      return { ...state, [action.payload._id]: action.payload }

    case CATEGORY_UPDATED:
      let temp = { ...state }
      temp[action.payload._id] = action.payload
      return temp

    case CATEGORY_REMOVED:
      const { [action.payload._id]: _, ...categories } = state
      return categories

    case ACCOUNT_CHANGED:
    case LOGGED_OUT:
      return {}

    default:
      return state
  }
}
