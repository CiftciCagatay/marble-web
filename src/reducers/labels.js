import { LABELS_FETCHED, LOGGED_OUT, ACCOUNT_CHANGED } from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case LABELS_FETCHED:
      return action.payload
    case ACCOUNT_CHANGED:
    case LOGGED_OUT:
      return []
    default:
      return state
  }
}
