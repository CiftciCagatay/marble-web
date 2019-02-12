import { COMPANIES_FETCHED, COMPANY_CREATED, COMPANY_UPDATED, COMPANY_REMOVED } from '../actions/types'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case COMPANIES_FETCHED:
      return _.mapKeys(action.payload, '_id')

    case COMPANY_CREATED:
      return { ...state, [action.payload._id]: action.payload }

    case COMPANY_UPDATED:
      return {
        ...state,
        [action.payload._id]: action.payload
      }

    case COMPANY_REMOVED:
      const { [action.payload._id]: removedCompany, ...rest } = state

      return { ...rest }

    default:
      return state
  }
}
