import { NOTIFICATIONS_FETCHED, NOTIFICATIONS_UPDATED } from './'

import { getNotifications, putNotifications } from '../api'

export const fetchNotifications = () => {
  return (dispatch, getState) => {
    const {
      auth: { token },
      users: { user }
    } = getState()

    return getNotifications(token, user._id)
      .then(response => {
        if (!response.ok) throw new Error('Users couldnt fetched')

        return response.json()
      })
      .then(({ result }) => {
        dispatch({ type: NOTIFICATIONS_FETCHED, payload: result })
        return Promise.resolve()
      })
      .catch(error => {
        return Promise.reject()
      })
  }
}

export const markNotificationsRead = ids => {
  return (dispatch, getState) => {
    const {
      auth: { token }
    } = getState()

    putNotifications(token, ids)
      .then(response => {
        if (!response.ok) throw new Error('Users couldnt fetched')

        dispatch({ type: NOTIFICATIONS_UPDATED, payload: ids })
      })
      .catch(error => console.log(error))
  }
}
