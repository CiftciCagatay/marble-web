import { OFFERS_FETCHED, OFFER_CREATED, OFFER_UPDATED, OFFER_REMOVED } from '../actions/types'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case OFFERS_FETCHED:
      return _.mapKeys(action.payload, '_id')

    case OFFER_CREATED:
      return { ...state, [action.payload._id]: action.payload }

    case OFFER_UPDATED:
      return {
        ...state,
        [action.payload._id]: action.payload
      }

    case OFFER_REMOVED:
      const { [action.payload._id]: removedOffer, ...rest } = state

      return { ...rest }

    default:
      return state
  }
}
