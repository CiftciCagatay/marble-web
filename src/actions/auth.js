import {
  ACCOUNT_REMOVED,
  LOGGED_IN,
  UNVALID_SESSION_TOKEN,
  LOGIN_FAILED,
  LOGGED_OUT,
  USER_FETCHED,
  USER_COULDNT_FETCHED,
  ACCOUNT_CHANGED
} from './'
import { login, secret, getUserInfo } from '../api'

export const onChangeAccount = account => {
  return dispatch => {
    dispatch({
      type: ACCOUNT_CHANGED,
      payload: account
    })
  }
}

export const onRemoveAccount = account => {
  return dispatch => {
    dispatch({
      type: ACCOUNT_REMOVED,
      payload: account
    })
  }
}

const onLoggedIn = (accessToken, refreshToken, user, dispatch) => {
  const { _id, email, company, name } = user

  dispatch({
    type: LOGGED_IN,
    payload: {
      _id,
      email,
      accessToken,
      refreshToken,
      company,
      name
    }
  })
}

export const onLogin = props => {
  return dispatch => {
    return login(props)
      .then(response => response.json())
      .then(({ accessToken, refreshToken }) =>
        getUserData(accessToken, refreshToken, dispatch)
      )
      .catch(error => {
        dispatch({
          type: LOGIN_FAILED,
          payload: error
        })

        return Promise.reject()
      })
  }
}

export const onLoginWithSecret = ({ accessToken, refreshToken }) => {
  return dispatch => {
    return secret({ accessToken }).then(() =>
      getUserData(accessToken, refreshToken, dispatch)
    )
  }
}

export const onLogout = () => {
  return dispatch => {
    dispatch({ type: LOGGED_OUT })
  }
}

const getUserData = (accessToken, refreshToken, dispatch) => {
  return getUserInfo(accessToken)
    .then(response => response.json())
    .then(user => {
      if (!user) throw new Error('Users couldnt fetched')
      dispatch({ type: USER_FETCHED, payload: user })
      return onLoggedIn(accessToken, refreshToken, user, dispatch)
    })
    .catch(error => {
      dispatch({ type: USER_COULDNT_FETCHED, payload: error })
      return Promise.reject()
    })
}
