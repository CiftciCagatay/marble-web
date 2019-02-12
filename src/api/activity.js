import { activityServiceUrl } from './config'
import fetch from '../scripts/fetch'
import _ from 'lodash'

export const getActivities = (accessToken, params = {}) => {
  let queryString = _.map(
    params,
    (value, key) => `${encodeURIComponent(key)}=${encodeURI(value)}`
  ).join('&')

  return fetch(`${activityServiceUrl}?${queryString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const postActivity = (accessToken, props) => {
  return fetch(activityServiceUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export const puAttendingStatus = (accessToken, activityId, attending) => {
  return fetch(`${activityServiceUrl}/${activityId}/attending`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify({ attending })
  })
}

export const putActivity = (accessToken, activityId, props) => {
  return fetch(`${activityServiceUrl}/${activityId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export const postParticipants = (accessToken, activityId, users) => {
  return fetch(`${activityServiceUrl}/${activityId}/participants`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify({ users })
  })
}

export const deleteParticipants = (accessToken, activityId, userIds) => {
  let query = `userIds=${JSON.stringify(userIds)}`

  return fetch(`${activityServiceUrl}/${activityId}/participants?${query}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const deleteActivity = (accessToken, activityId) => {
  return fetch(`${activityServiceUrl}/${activityId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}
