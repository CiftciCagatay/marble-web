import { saleServiceUrl } from './config'
import fetch from '../scripts/fetch'

export function getSales(accessToken) {
  return fetch(`${saleServiceUrl}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export function postSale(accessToken, props) {
  return fetch(`${saleServiceUrl}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export function putSale(accessToken, _id, props) {
  return fetch(`${saleServiceUrl}/${_id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export function deleteSale(accessToken, _id) {
  return fetch(`${saleServiceUrl}/${_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}
