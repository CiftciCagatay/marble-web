import {
  feedbackServiceUrl,
  roleServiceUrl
} from './config'
import fetch from '../scripts/fetch'

export function getRole(accessToken, roleId) {
  return fetch(`${roleServiceUrl}/${roleId}`, {
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
