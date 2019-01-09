import {
  CLEAN_ISSUES,
  ISSUES_FETCHED,
  ISSUE_CREATED,
  MORE_ISSUES_FETCHED,
  ISSUE_UPDATED,
  ISSUE_REMOVED,
  ASSIGNEES_UPDATED,
  LABELS_UPDATED,
  LOGGED_OUT,
  ACCOUNT_CHANGED
} from '../actions'

import { mapKeys } from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case ISSUES_FETCHED:
      return mapKeys(action.payload, '_id')

    case MORE_ISSUES_FETCHED:
      const newIssues = mapKeys(action.payload, '_id')
      return Object.assign({}, { ...state, ...newIssues })

    case ISSUE_CREATED:
      return { [action.payload._id]: action.payload, ...state }

    case ISSUE_UPDATED:
      let temp = {}
      temp[action.payload._id] = action.payload
      return Object.assign({}, { ...state, ...temp })

    case ISSUE_REMOVED:
      let { [action.payload]: undefined, ...newState } = state
      return newState

    case LABELS_UPDATED:
      const { labels } = action.payload

      if (!state[action.payload.issueId]) return state

      let _state = { ...state }

      _state[action.payload.issueId].labels = labels

      return _state

    case ASSIGNEES_UPDATED:
      const { issueId, assignees } = action.payload

      if (!state[issueId]) return state

      let tempState = { ...state }

      tempState[action.payload.issueId].assignees = assignees

      return tempState

    case ACCOUNT_CHANGED:
    case CLEAN_ISSUES:
    case LOGGED_OUT:
      return {}

    default:
      return state
  }
}
