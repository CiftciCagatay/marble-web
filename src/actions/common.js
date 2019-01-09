import { getUnits, getCategories } from '../api'
import { UNITS_FETCHED, CATEGORIES_FETCHED } from '.'

export function fetchUnits() {
  return (dispatch, getState) => {
    const {
      auth: { token }
    } = getState()

    return getUnits(token)
      .then(response => {
        if (!response.ok) throw new Error('Units couldnt fetched')
        return response.json()
      })
      .then(({ result }) => {
        dispatch({ type: UNITS_FETCHED, payload: result })
        return Promise.resolve()
      })
      .catch(error => {
        console.log(error)
        return Promise.reject()
      })
  }
}

export function fetchCategories({ unit }) {
  return (dispatch, getState) => {
    const {
      auth: { token }
    } = getState()

    return getCategories(token, { unit })
      .then(response => {
        if (!response.ok) throw new Error('Categories couldnt fetched')
        return response.json()
      })
      .then(({ result }) => {
        dispatch({ type: CATEGORIES_FETCHED, payload: result })

        return Promise.resolve()
      })
      .catch(error => {
        console.log(error)
        return Promise.reject()
      })
  }
}
