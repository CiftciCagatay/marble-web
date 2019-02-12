import {
  ISSUE_EVENTS_FETCHED,
  ISSUE_EVENTS_ADDED,
  ISSUE_EVENT_FILE_UPLOADED,
  ISSUE_EVENT_CREATED,
  ACCOUNT_CHANGED,
  LOGGED_OUT,
  ISSUE_EVENT_REMOVED,
  LABELS_UPDATED,
  ASSIGNEES_UPDATED
} from '../actions'

import { mapKeys } from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case ISSUE_EVENTS_FETCHED:
      return mapKeys(action.payload, '_id')

    case ISSUE_EVENTS_ADDED:
      return { ...state, ...action.payload }

    case ISSUE_EVENT_FILE_UPLOADED:
      return {
        ...state,
        [action.payload.tempId]: {
          ...state[action.payload.tempId],
          ...action.payload
        }
      }

    case ASSIGNEES_UPDATED:
    case LABELS_UPDATED:
      return {
        ...state,
        ...mapKeys(action.payload.events, '_id')
      }

    case ISSUE_EVENT_CREATED:
      if (action.payload.tempId) {
        return {
          ...state,
          [action.payload.tempId]: { ...action.payload, tempId: null }
        }
      } else {
        return { ...state, [action.payload._id]: action.payload }
      }

    case ISSUE_EVENT_REMOVED:
      let { [action.payload.id]: _, ...newState } = state
      return newState

    case ACCOUNT_CHANGED:
    case LOGGED_OUT:
      return []

    default:
      return state
  }
}
