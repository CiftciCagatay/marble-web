import {
  SALES_FETCHED,
  SALE_CREATED,
  SALE_UPDATED,
  SALE_REMOVED
} from './types'

import { getSales, postSale, putSale, deleteSale } from '../api'

export const fetchSales = () => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getSales(accessToken)
      .then(response => response.json())
      .then(({ sales }) => dispatch({ type: SALES_FETCHED, payload: sales }))
      .catch(err => console.log(err))
  }
}

export const createSale = props => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return postSale(accessToken, props)
      .then(response => response.json())
      .then(({ sale }) =>
        dispatch({ type: SALE_CREATED, payload: { ...props, ...sale } })
      )
      .catch(err => console.log(err))
  }
}

export const updateSale = (_id, props) => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return putSale(accessToken, _id, props)
      .then(() => dispatch({ type: SALE_UPDATED, payload: { ...props, _id } }))
      .catch(err => console.log(err))
  }
}

export const removeSale = _id => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteSale(accessToken, _id)
      .then(() => dispatch({ type: SALE_REMOVED, payload: { _id } }))
      .catch(err => console.log(err))
  }
}
