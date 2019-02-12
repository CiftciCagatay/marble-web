import { offerServiceUrl } from './config'
import fetch from '../scripts/fetch'

export function getOffers(accessToken) {
  return fetch(`${offerServiceUrl}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export function postOffer(accessToken, props) {
  return fetch(`${offerServiceUrl}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export function putOffer(accessToken, _id, props) {
  return fetch(`${offerServiceUrl}/${_id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export function deleteOffer(accessToken, _id) {
  return fetch(`${offerServiceUrl}/${_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}
