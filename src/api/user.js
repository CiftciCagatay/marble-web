import { userServiceUrl } from './config'
import fetch from '../scripts/fetch'

export const getUserInfo = accessToken => {
  return fetch(`${userServiceUrl}/token`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const getUsers = (accessToken, { unit, units }) => {
  let query = ''

  if (unit) query = `unit=${unit}&&`
  if (units) query = `units=${units}&&`

  return fetch(`${userServiceUrl}?${query}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}
