import {
  COMPANIES_FETCHED,
  COMPANY_CREATED,
  COMPANY_UPDATED,
  COMPANY_REMOVED
} from './types'

import { getCompanies, postCompany, putCompany, deleteCompany } from '../api'

export const fetchCompanies = () => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getCompanies(accessToken)
      .then(response => response.json())
      .then(({ companies }) =>
        dispatch({ type: COMPANIES_FETCHED, payload: companies })
      )
      .catch(err => console.log(err))
  }
}

export const createCompany = props => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return postCompany(accessToken, props)
      .then(response => response.json())
      .then(({ company }) => {
        dispatch({ type: COMPANY_CREATED, payload: { ...props, ...company } })

        return Promise.resolve()
      })
      .catch(err => console.log(err))
  }
}

export const updateCompany = (_id, props) => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return putCompany(accessToken, _id, props)
      .then(() =>
        dispatch({ type: COMPANY_UPDATED, payload: { ...props, _id } })
      )
      .catch(err => console.log(err))
  }
}

export const removeCompany = _id => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteCompany(accessToken, _id)
      .then(() => dispatch({ type: COMPANY_REMOVED, payload: { _id } }))
      .catch(err => console.log(err))
  }
}
