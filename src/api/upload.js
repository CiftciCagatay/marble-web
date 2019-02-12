import { fileServiceUrl } from './config'
import fetch from '../scripts/fetch'
import _ from 'lodash'

export const getFiles = (accessToken, params) => {
  let query = _.map(
    params,
    (value, key) => `${encodeURIComponent(key)}=${encodeURI(value)}`
  ).join('&')

  return fetch(`${fileServiceUrl}?${query}`, {
    headers: { Authorization: accessToken }
  })
}

export const uploadImage = (accessToken, data, onProgress) => {
  return fetch(fileServiceUrl, {
    method: 'POST',
    headers: {
      Authorization: accessToken
    },
    body: data
  })
}
