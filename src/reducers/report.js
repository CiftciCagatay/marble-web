import {
  PROBLEM_RESOURCES_REPORT_DATA_FETCHED,
  SOLVERS_GUILD_REPORT_DATA_FETCHED,
  HOME_PAGE_REPORT_DATA_FETCHED,
  ACCOUNT_CHANGED,
  LOGGED_OUT
} from '../actions'

const INITIAL_STATE = {
  homePage: {},
  solversGuild: [],
  problemResources: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROBLEM_RESOURCES_REPORT_DATA_FETCHED:
      return { ...state, problemResources: action.payload }
      
    case SOLVERS_GUILD_REPORT_DATA_FETCHED:
      return { ...state, solversGuild: action.payload }

    case HOME_PAGE_REPORT_DATA_FETCHED:
      return { ...state, homePage: action.payload }

    case ACCOUNT_CHANGED:
    case LOGGED_OUT:
      return INITIAL_STATE

    default:
      return state
  }
}
