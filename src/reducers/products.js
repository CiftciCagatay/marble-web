import { PRODUCTS_FETCHED, PRODUCT_CREATED, PRODUCT_UPDATED, PRODUCT_REMOVED } from '../actions/types'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case PRODUCTS_FETCHED:
      return _.mapKeys(action.payload, '_id')

    case PRODUCT_CREATED:
      return { ...state, [action.payload._id]: action.payload }

    case PRODUCT_UPDATED:
      return {
        ...state,
        [action.payload._id]: action.payload
      }

    case PRODUCT_REMOVED:
      const { [action.payload._id]: removedProduct, ...rest } = state

      return { ...rest }

    default:
      return state
  }
}
