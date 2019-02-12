import {
  CONTACTS_FETCHED,
  CONTACT_CREATED,
  CONTACT_UPDATED,
  CONTACT_REMOVED
} from '../actions/types'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case CONTACTS_FETCHED:
      return _.mapKeys(action.payload, '_id')

    case CONTACT_CREATED:
      return { ...state, [action.payload._id]: action.payload }

    case CONTACT_UPDATED:
      return {
        ...state,
        [action.payload._id]: action.payload
      }

    case CONTACT_REMOVED:
      const { [action.payload._id]: removedContact, ...rest } = state

      return { ...rest }

    default:
      return state
  }
}
