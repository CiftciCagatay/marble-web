import {
  categoryServiceUrl,
  unitServiceUrl,
  labelServiceUrl,
  feedbackServiceUrl
} from './config'

export function getUnits(token) {
  return fetch(`${unitServiceUrl}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export function getCategories(token, { unit }) {
  return fetch(`${categoryServiceUrl}?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export const getLabels = (token, { unit }) => {
  return fetch(`${labelServiceUrl}?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export function postFeedback(token, body) {
  return fetch(feedbackServiceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(body)
  })
}
