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

export const getUsers = (accessToken, params = {}) => {
  let query = ''

  const { unit, units } = params

  if (unit) query = `unit=${unit}&`
  if (units) query = `units=${units}&`

  return fetch(`${userServiceUrl}?${query}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const getUsersByUnit = (accessToken, unit) => {
  return fetch(`${userServiceUrl}/byUnits?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const addUserToUnit = (accessToken, { userId, unitId, isAdmin }) => {
  return fetch(`${userServiceUrl}/${userId}/units`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify({ unitId, isAdmin })
  })
}

export const removeUserFromUnit = (accessToken, { userId, unitId }) => {
  return fetch(`${userServiceUrl}/${userId}/units/${unitId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}
