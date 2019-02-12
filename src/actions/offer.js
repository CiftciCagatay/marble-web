import {
  OFFERS_FETCHED,
  OFFER_CREATED,
  OFFER_UPDATED,
  OFFER_REMOVED
} from './types'

import { getOffers, postOffer, putOffer, deleteOffer } from '../api'

export const fetchOffers = () => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getOffers(accessToken)
      .then(response => response.json())
      .then(({ offers }) => dispatch({ type: OFFERS_FETCHED, payload: offers }))
      .catch(err => console.log(err))
  }
}

export const createOffer = props => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return postOffer(accessToken, props)
      .then(response => response.json())
      .then(({ offer }) =>
        dispatch({ type: OFFER_CREATED, payload: { ...props, ...offer } })
      )
      .catch(err => console.log(err))
  }
}

export const updateOffer = (_id, props) => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return putOffer(accessToken, _id, props)
      .then(() => dispatch({ type: OFFER_UPDATED, payload: { ...props, _id } }))
      .catch(err => console.log(err))
  }
}

export const removeOffer = _id => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteOffer(accessToken, _id)
      .then(() => dispatch({ type: OFFER_REMOVED, payload: { _id } }))
      .catch(err => console.log(err))
  }
}
