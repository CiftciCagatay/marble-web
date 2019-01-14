import { unitServiceUrl } from './config'
import fetch from '../scripts/fetch'

export const getUnits = accessToken => {
  return fetch(unitServiceUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const postUnit = (accessToken, props) => {
  return fetch(unitServiceUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export const putUnit = (accessToken, props) => {
  return fetch(`${unitServiceUrl}/${props._id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export const deleteUnit = (accessToken, _id) => {
  return fetch(`${unitServiceUrl}/${_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}
