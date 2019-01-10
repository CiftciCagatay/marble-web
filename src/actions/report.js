import {
  HOME_PAGE_REPORT_DATA_FETCHED,
  SOLVERS_GUILD_REPORT_DATA_FETCHED,
  PROBLEM_RESOURCES_REPORT_DATA_FETCHED
} from './'

import {
  getHomePageReport,
  getSolversGuildReport,
  getProblemResourcesReport
} from '../api'

export const fetchHomePageReport = filters => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken },
      users: {
        user: { unit }
      }
    } = getState()

    return getHomePageReport(accessToken, { ...filters, unit })
      .then(response => {
        if (!response.ok) throw new Error('Issue Events couldnt fetched')
        return response.json()
      })
      .then(result => {
        dispatch({ type: HOME_PAGE_REPORT_DATA_FETCHED, payload: result })
        return Promise.resolve()
      })
  }
}

export const fetchSolverGuildReport = filters => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken },
      users: { user }
    } = getState()
    
    return getSolversGuildReport(accessToken, { ...filters, unit: user.unit })
      .then(response => {
        if (!response.ok) throw new Error('Issue Events couldnt fetched')
        return response.json()
      })
      .then(result => {
        dispatch({ type: SOLVERS_GUILD_REPORT_DATA_FETCHED, payload: result })
        return Promise.resolve()
      })
  }
}

export const fetchProblemResourcesReport = filters => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken },
      users: {
        user: { unit }
      }
    } = getState()

    return getProblemResourcesReport(accessToken, { ...filters, unit })
      .then(response => {
        if (!response.ok) throw new Error('Issue Events couldnt fetched')
        return response.json()
      })
      .then(result => {
        dispatch({
          type: PROBLEM_RESOURCES_REPORT_DATA_FETCHED,
          payload: result
        })
        return Promise.resolve()
      })
  }
}
