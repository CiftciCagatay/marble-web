import { USERS_FETCHED, USERS_COULDNT_FETCHED } from './'

import { getUsers } from '../api'

export const getUserList = (props = {}) => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getUsers(accessToken, props)
      .then(response => response.json())
      .then(({ results }) =>
        dispatch({ type: USERS_FETCHED, payload: results })
      )
      .catch(error => dispatch({ type: USERS_COULDNT_FETCHED, payload: error }))
  }
}
