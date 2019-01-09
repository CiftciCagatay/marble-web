import {
  ACCOUNT_REMOVED,
  LOGGED_IN,
  LOGGED_IN_WITH_SECRET,
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

const onLoggedIn = (token, user, dispatch) => {
  const { _id, email, company, name } = user

  dispatch({
    type: LOGGED_IN,
    payload: {
      _id,
      email,
      token,
      company,
      name
    }
  })
}

export const onLogin = props => {
  return dispatch => {
    return login(props)
      .then(response => {
        if (!response.ok) throw new Error('Email veya şifre hatalı.')
        return response.json()
      })
      .then(({ token }) => getUserData(token, dispatch))
      .catch(error => {
        dispatch({
          type: LOGIN_FAILED,
          payload: error
        })

        return Promise.reject()
      })
  }
}

export const onLoginWithSecret = ({ email, token }) => {
  return dispatch => {
    return secret({ token })
      .then(response => {
        if (!response.ok) throw new Error('Email veya şifre hatalı.')

        return getUserData(token, dispatch)
      })
      .catch(error => {
        dispatch({
          type: UNVALID_SESSION_TOKEN,
          payload: { email }
        })

        return Promise.reject()
      })
  }
}

export const onLogout = () => {
  return dispatch => {
    dispatch({ type: LOGGED_OUT })
  }
}

const getUserData = (token, dispatch) => {
  return getUserInfo(token)
    .then(response => {
      if (!response.ok) throw new Error('Users couldnt fetched')

      return response.json()
    })
    .then(user => {
      if (!user) throw new Error('Users couldnt fetched')
      dispatch({ type: USER_FETCHED, payload: user })
      return onLoggedIn(token, user, dispatch)
    })
    .catch(error => {
      dispatch({ type: USER_COULDNT_FETCHED, payload: error })
      return Promise.reject()
    })
}
