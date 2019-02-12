import {
  PRODUCTS_FETCHED,
  PRODUCT_CREATED,
  PRODUCT_UPDATED,
  PRODUCT_REMOVED
} from './types'

import { getProducts, postProduct, putProduct, deleteProduct } from '../api'

export const fetchProducts = () => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getProducts(accessToken)
      .then(response => response.json())
      .then(({ products }) => dispatch({ type: PRODUCTS_FETCHED, payload: products }))
      .catch(err => console.log(err))
  }
}

export const createProduct = props => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return postProduct(accessToken, props)
      .then(response => response.json())
      .then(({ product }) =>
        dispatch({ type: PRODUCT_CREATED, payload: { ...props, ...product } })
      )
      .catch(err => console.log(err))
  }
}

export const updateProduct = (_id, props) => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return putProduct(accessToken, _id, props)
      .then(() => dispatch({ type: PRODUCT_UPDATED, payload: { ...props, _id } }))
      .catch(err => console.log(err))
  }
}

export const removeProduct = _id => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteProduct(accessToken, _id)
      .then(() => dispatch({ type: PRODUCT_REMOVED, payload: { _id } }))
      .catch(err => console.log(err))
  }
}
