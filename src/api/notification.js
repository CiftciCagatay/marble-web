import { notificationServiceUrl } from './config'

export const getNotifications = (token, userId) => {
  return fetch(`${notificationServiceUrl}/?userId=${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export const putNotifications = (token, ids) => {
  return fetch(`${notificationServiceUrl}?ids=${JSON.stringify(ids)}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}
