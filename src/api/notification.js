import { notificationServiceUrl } from './config'
import fetch from '../scripts/fetch'

export const getNotifications = (accessToken, userId) => {
  return fetch(`${notificationServiceUrl}/?userId=${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const putNotifications = (accessToken, ids) => {
  return fetch(`${notificationServiceUrl}?ids=${JSON.stringify(ids)}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}
