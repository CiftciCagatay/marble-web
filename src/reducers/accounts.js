import {
  LOGGED_IN,
  LOGGED_OUT,
  ACCOUNTS_FETCHED,
  ACCOUNT_CHANGED,
  ACCOUNT_REMOVED,
  UNVALID_SESSION_TOKEN
} from '../actions'

const INITIAL_STATE = {
  accounts: {},
  activeAccountEmail: ''
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGGED_IN:
      return {
        activeAccountEmail: payload.email,
        accounts: { ...state.accounts, [payload.email]: payload }
      }

    case ACCOUNTS_FETCHED:
      return {
        ...state,
        ...payload
      }

    case ACCOUNT_CHANGED:
      return {
        ...state,
        activeAccountEmail: payload.email
      }

    case ACCOUNT_REMOVED:
      const { [action.payload.email]: _, ...accounts } = state.accounts

      return {
        accounts,
        activeAccountEmail: state.activeAccountEmail
      }

    case UNVALID_SESSION_TOKEN:
      let { [action.payload.email]: unvalidAccount, ...others } = state.accounts
      delete account.accessToken
      delete account.refreshToken

      return {
        accounts: { ...others, [action.payload.email]: unvalidAccount },
        activeAccountEmail:
          action.payload.email === state.activeAccountEmail
            ? null
            : state.activeAccountEmail
      }

    case LOGGED_OUT:
      let { [state.activeAccountEmail]: account, ...rest } = state.accounts
      delete account.accessToken
      delete account.refreshToken

      return {
        accounts: { ...rest, [state.activeAccountEmail]: account },
        activeAccountEmail: null
      }

    default:
      return state
  }
}
