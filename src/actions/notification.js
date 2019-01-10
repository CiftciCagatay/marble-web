import { NOTIFICATIONS_FETCHED, NOTIFICATIONS_UPDATED } from './'

import { getNotifications, putNotifications } from '../api'

export const fetchNotifications = () => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken },
      users: { user }
    } = getState()

    return getNotifications(accessToken, user._id)
      .then(response => response.json())
      .then(({ result }) => {
        dispatch({ type: NOTIFICATIONS_FETCHED, payload: result })
        return Promise.resolve()
      })
      .catch(() => {
        return Promise.reject()
      })
  }
}

export const markNotificationsRead = ids => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    putNotifications(accessToken, ids)
      .then(() => {
        dispatch({ type: NOTIFICATIONS_UPDATED, payload: ids })
      })
      .catch(error => console.log(error))
  }
}
