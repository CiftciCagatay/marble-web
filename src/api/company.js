import { companyServiceUrl } from './config'
import fetch from '../scripts/fetch'

export function getCompanies(accessToken) {
  return fetch(`${companyServiceUrl}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export function postCompany(accessToken, props) {
  return fetch(`${companyServiceUrl}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export function putCompany(accessToken, _id, props) {
  return fetch(`${companyServiceUrl}/${_id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export function deleteCompany(accessToken, _id) {
  return fetch(`${companyServiceUrl}/${_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}
