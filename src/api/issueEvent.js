import { issueEventServiceUrl } from './config'
import fetch from '../scripts/fetch'

export const getIssueEvents = (accessToken, issueId, limit, orderDes) => {
  let query = `orderDes=${orderDes}&limit=${limit}`

  if (issueId) query += `&issueId=${issueId}`

  return fetch(`${issueEventServiceUrl}?${query}`, {
    method: 'GET',
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}

export const createIssueEvent = (accessToken, props) => {
  return fetch(`${issueEventServiceUrl}`, {
    method: 'POST',
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ ...props, date: new Date() })
  })
}

export const removeIssueEvent = (accessToken, id) => {
  return fetch(`${issueEventServiceUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}
