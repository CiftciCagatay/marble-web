import { getUnits, postUnit, putUnit, deleteUnit } from '../api'
import {
  UNITS_FETCHED,
  UNIT_CREATED,
  UNIT_UPDATED,
  UNIT_REMOVED
} from './types'

export function fetchUnits() {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getUnits(accessToken)
      .then(response => response.json())
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

export function createUnit(props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return postUnit(accessToken, props)
      .then(response => response.json())
      .then(({ result }) => {
        dispatch({ type: UNIT_CREATED, payload: { ...props, ...result } })
        return Promise.resolve(result)
      })
      .catch(error => console.log(error))
  }
}

export function updateUnit(props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return putUnit(accessToken, props)
      .then(() => dispatch({ type: UNIT_UPDATED, payload: props }))
      .catch(error => console.log(error))
  }
}

export function removeUnit(_id) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteUnit(accessToken, _id)
      .then(() => dispatch({ type: UNIT_REMOVED, payload: { _id } }))
      .catch(error => console.log(error))
  }
}
