import {
  LOGGED_IN,
  LOGGED_OUT,
  LOGGED_IN_WITH_SECRET,
  ACCESS_TOKEN_REFRESHED
} from '../actions'

const INITIAL_STATE = {
  accessToken: '',
  refreshToken: '',
  isLoggedIn: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGGED_IN:
    case LOGGED_IN_WITH_SECRET:
    case ACCESS_TOKEN_REFRESHED:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      }

    case LOGGED_OUT:
      return {
        ...INITIAL_STATE
      }

    default:
      return state
  }
}
