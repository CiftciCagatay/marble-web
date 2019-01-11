import { authenticationServiceUrl } from './config'
import fetchCustom from '../scripts/fetch'

export const login = ({ email, password }) => {
  return fetchCustom(`${authenticationServiceUrl}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
}

export const secret = ({ accessToken }) => {
  return fetchCustom(`${authenticationServiceUrl}/token`, {
    method: 'POST',
    headers: {
      Authorization: accessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export const refresh = ({ refreshToken }) => {
  return fetch(`${authenticationServiceUrl}/refresh`, {
    method: 'POST',
    headers: {
      Authorization: refreshToken,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
