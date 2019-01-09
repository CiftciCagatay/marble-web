import {
  USER_FETCHED,
  USERS_FETCHED,
  USER_COULDNT_FETCHED,
  USERS_COULDNT_FETCHED
} from './'

import { getUsers } from '../api'

export const getUserList = (props = {}) => {
  return (dispatch, getState) => {
    const {
      auth: { token }
    } = getState()

    return getUsers(token, props)
      .then(response => {
        if (!response.ok) throw new Error('Users couldnt fetched')

        return response.json()
      })
      .then(({ results }) =>
        dispatch({ type: USERS_FETCHED, payload: results })
      )
      .catch(error => dispatch({ type: USERS_COULDNT_FETCHED, payload: error }))
  }
}
