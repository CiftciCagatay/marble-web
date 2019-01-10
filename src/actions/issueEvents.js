import {
  ISSUE_EVENTS_FETCHED,
  ISSUE_EVENT_REMOVED,
  ISSUE_EVENTS_ADDED,
  ISSUE_EVENT_FILE_UPLOADED,
  ISSUE_EVENT_CREATED
} from './'
import { getIssueEvents, createIssueEvent, removeIssueEvent } from '../api'

export function fetchIssueEvents(issueId, limit = -1, orderDes = 1) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getIssueEvents(accessToken, issueId, limit, orderDes)
      .then(response => {
        if (!response.ok) throw new Error('Issue Events couldnt fetched')
        return response.json()
      })
      .then(({ result }) => {
        dispatch({ type: ISSUE_EVENTS_FETCHED, payload: result })
      })
      .catch(error => console.log(error))
  }
}

export function addIssueEventsToUpload(props) {
  return dispatch => dispatch({ type: ISSUE_EVENTS_ADDED, payload: props })
}

export function issueEventFileUploaded(tempId, file) {
  return dispatch =>
    dispatch({ type: ISSUE_EVENT_FILE_UPLOADED, payload: { file, tempId } })
}

export function postIssueEvent(props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken },
      users: { user }
    } = getState()

    let body = {
      ...props,
      author: user,
      date: new Date()
    }

    return createIssueEvent(accessToken, body)
      .then(response => {
        if (!response.ok) throw new Error('Issue Event couldnt created')
        return response.json()
      })
      .then(({ result }) => {
        dispatch({
          type: ISSUE_EVENT_CREATED,
          payload: { ...result, tempId: props.tempId }
        })
      })
      .catch(error => console.log(error))
  }
}

export function deleteIssueEvent(id) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return removeIssueEvent(accessToken, id)
      .then(response => {
        if (!response.ok) throw new Error('Issue Event couldnt removed')

        dispatch({
          type: ISSUE_EVENT_REMOVED,
          payload: { id }
        })
      })
      .catch(error => console.log(error))
  }
}
