import { labelServiceUrl } from './config'
import fetch from '../scripts/fetch'

export const getLabels = (accessToken, { unit }) => {
  return fetch(`${labelServiceUrl}?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const postLabel = (accessToken, props) => {
  return fetch(labelServiceUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export const putLabel = (accessToken, props) => {
  return fetch(`${labelServiceUrl}/${props._id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export const deleteLabel = (accessToken, _id) => {
  return fetch(`${labelServiceUrl}/${_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}
