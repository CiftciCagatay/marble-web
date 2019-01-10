import { authenticationServiceUrl } from './config'

export const login = ({ email, password }) => {
  return fetch(`${authenticationServiceUrl}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
}

export const secret = ({ accessToken }) => {
  return fetch(`${authenticationServiceUrl}/token`, {
    method: 'POST',
    headers: {
      Authorization: accessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
