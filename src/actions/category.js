import {
  CATEGORIES_FETCHED,
  CATEGORY_CREATED,
  CATEGORY_UPDATED,
  CATEGORY_REMOVED
} from './types'

import {
  getCategories,
  postCategory,
  putCategory,
  deleteCategory
} from '../api'

export function fetchCategories({ unit }) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getCategories(accessToken, { unit })
      .then(response => response.json())
      .then(({ result }) => {
        return dispatch({ type: CATEGORIES_FETCHED, payload: result })
      })
      .catch(error => console.log(error))
  }
}

export function createCategory(props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return postCategory(accessToken, props)
      .then(response => response.json())
      .then(({ result }) =>
        dispatch({ type: CATEGORY_CREATED, payload: { ...props, ...result } })
      )
      .catch(error => console.log(error))
  }
}

export function updateCategory(props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return putCategory(accessToken, props)
      .then(() => dispatch({ type: CATEGORY_UPDATED, payload: props }))
      .catch(error => console.log(error))
  }
}

export function removeCategory(_id) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteCategory(accessToken, _id)
      .then(() => dispatch({ type: CATEGORY_REMOVED, payload: { _id } }))
      .catch(error => console.log(error))
  }
}
