import { LOGGED_OUT, ACCOUNT_CHANGED } from '../actions'
import {
  LABELS_FETCHED,
  LABEL_CREATED,
  LABEL_UPDATED,
  LABEL_REMOVED
} from '../actions/types'
import { mapKeys } from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case LABELS_FETCHED:
      return mapKeys(action.payload, '_id')

    case LABEL_CREATED:
      return { ...state, [action.payload._id]: action.payload }

    case LABEL_UPDATED:
      let temp = { ...state }
      temp[action.payload._id] = action.payload
      return temp

    case LABEL_REMOVED:
      const { [action.payload._id]: _, ...labels } = state
      return labels

    case ACCOUNT_CHANGED:
    case LOGGED_OUT:
      return []

    default:
      return state
  }
}
