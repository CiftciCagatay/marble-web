import {
  ACTIVITIES_FETCHED,
  ACTIVITY_CREATED,
  ACTIVITY_ATTENDING_STATUS_CHANGED,
  ACTIVITY_UPDATED,
  ACTIVITY_REMOVED,
  PARTICIPANTS_ADDED,
  PARTICIPANTS_REMOVED
} from './types'

import {
  getActivities,
  postActivity,
  puAttendingStatus,
  putActivity,
  postParticipants,
  deleteParticipants,
  deleteActivity
} from '../api'

export function fetchActivities() {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getActivities(accessToken)
      .then(response => response.json())
      .then(({ activities }) => {
        return dispatch({ type: ACTIVITIES_FETCHED, payload: activities })
      })
      .catch(error => console.log(error))
  }
}

export function createActivity(props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return postActivity(accessToken, props)
      .then(response => response.json())
      .then(({ result }) => {
        return dispatch({ type: ACTIVITY_CREATED, payload: result })
      })
      .catch(error => console.log(error))
  }
}

export function updateAttendingStatusForActivity(activityId, attending) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken },
      users: { user },
      calendar: { calendar }
    } = getState()

    return puAttendingStatus(accessToken, activityId, attending)
      .then(() => {
        if (calendar !== null) {
          const event = calendar.getEventById(activityId)

          if (event) {
            event.setProp('backgroundColor', attending ? '#0F796B' : '#FFF')
            event.setProp('textColor', attending ? '#FFF' : '#000')
            event.setProp('borderColor', attending ? '#0F796B' : '#e52020')
          }
        }

        dispatch({
          type: ACTIVITY_ATTENDING_STATUS_CHANGED,
          payload: { _id: activityId, userId: user._id, attending }
        })

        return Promise.resolve()
      })
      .catch(error => console.log(error))
  }
}

export function updateActivity(activityId, props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return putActivity(accessToken, activityId, props)
      .then(() =>
        dispatch({
          type: ACTIVITY_UPDATED,
          payload: { _id: activityId, ...props }
        })
      )
      .catch(error => console.log(error))
  }
}

export function addParticipants(activityId, users) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return postParticipants(accessToken, activityId, users)
      .then(() =>
        dispatch({
          type: PARTICIPANTS_ADDED,
          payload: { activityId, users }
        })
      )
      .catch(error => console.log(error))
  }
}

export function removeParticipants(activityId, userIds) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteParticipants(accessToken, activityId, userIds)
      .then(() =>
        dispatch({
          type: PARTICIPANTS_REMOVED,
          payload: { activityId, userIds }
        })
      )
      .catch(error => console.log(error))
  }
}

export function removeActivity(activityId) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteActivity(accessToken, activityId)
      .then(() =>
        dispatch({
          type: ACTIVITY_REMOVED,
          payload: { _id: activityId }
        })
      )
      .catch(error => console.log(error))
  }
}
