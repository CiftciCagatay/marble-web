import {
  USER_FETCHED,
  USERS_FETCHED,
  LOGGED_OUT,
  ACCOUNT_CHANGED
} from '../actions'

const INITIAL_STATE = {
    user: {},
    users: []
}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case USER_FETCHED:
      return {
        ...state,
        user: action.payload
      }

    case USERS_FETCHED:
      return {
        ...state,
        users: action.payload
      }

    case LOGGED_OUT:
      return INITIAL_STATE
    
    default:
      return state
  }
}