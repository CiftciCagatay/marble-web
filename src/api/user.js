import { userServiceUrl } from './config'

export const getUserInfo = token => {
  return fetch(`${userServiceUrl}/token`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export const getUsers = (token, { unit, units }) => {
  let query = ''

  if (unit) query = `unit=${unit}&&`
  if (units) query = `units=${units}&&`

  return fetch(`${userServiceUrl}?${query}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}
