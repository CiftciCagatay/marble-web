import { SALES_FETCHED, SALE_CREATED, SALE_UPDATED, SALE_REMOVED } from '../actions/types'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case SALES_FETCHED:
      return _.mapKeys(action.payload, '_id')

    case SALE_CREATED:
      return { ...state, [action.payload._id]: action.payload }

    case SALE_UPDATED:
      return {
        ...state,
        [action.payload._id]: action.payload
      }

    case SALE_REMOVED:
      const { [action.payload._id]: removedSale, ...rest } = state

      return { ...rest }

    default:
      return state
  }
}
