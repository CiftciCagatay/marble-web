import { categoryServiceUrl } from './config'
import fetch from '../scripts/fetch'

export const getCategories = (accessToken, { unit }) => {
  return fetch(`${categoryServiceUrl}?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const postCategory = (accessToken, props) => {
  return fetch(categoryServiceUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export const putCategory = (accessToken, props) => {
  return fetch(`${categoryServiceUrl}/${props._id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export const deleteCategory = (accessToken, _id) => {
  return fetch(`${categoryServiceUrl}/${_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}
