import {
  LABELS_FETCHED,
  LABEL_CREATED,
  LABEL_UPDATED,
  LABEL_REMOVED
} from './types'

import { getLabels, postLabel, putLabel, deleteLabel } from '../api'

export function fetchLabels({ unit }) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getLabels(accessToken, { unit })
      .then(response => response.json())
      .then(({ result }) => dispatch({ type: LABELS_FETCHED, payload: result }))
      .catch(error => console.log(error))
  }
}

export function createLabel(props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return postLabel(accessToken, props)
      .then(response => response.json())
      .then(({ result }) =>
        dispatch({ type: LABEL_CREATED, payload: { ...props, ...result } })
      )
      .catch(error => console.log(error))
  }
}

export function updateLabel(props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return putLabel(accessToken, props)
      .then(() => dispatch({ type: LABEL_UPDATED, payload: props }))
      .catch(error => console.log(error))
  }
}

export function removeLabel(_id) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteLabel(accessToken, _id)
      .then(() => dispatch({ type: LABEL_REMOVED, payload: { _id } }))
      .catch(error => console.log(error))
  }
}
