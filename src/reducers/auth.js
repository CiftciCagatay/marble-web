import { LOGGED_IN, LOGGED_OUT, LOGGED_IN_WITH_SECRET, ACCOUNT_CHANGED } from '../actions'

const INITIAL_STATE = {
  token: '',
  isLoggedIn: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGGED_IN:
    case LOGGED_IN_WITH_SECRET:
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
