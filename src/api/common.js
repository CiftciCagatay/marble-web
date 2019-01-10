import {
  categoryServiceUrl,
  unitServiceUrl,
  labelServiceUrl,
  feedbackServiceUrl
} from './config'
import fetch from '../scripts/fetch'

export function getUnits(accessToken) {
  return fetch(`${unitServiceUrl}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export function getCategories(accessToken, { unit }) {
  return fetch(`${categoryServiceUrl}?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

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

export function postFeedback(accessToken, body) {
  return fetch(feedbackServiceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(body)
  })
}
