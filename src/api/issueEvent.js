import { issueEventServiceUrl } from './config'

export const getIssueEvents = (token, issueId, limit, orderDes) => {
  let query = `orderDes=${orderDes}&limit=${limit}`

  if (issueId) query += `&issueId=${issueId}`

  return fetch(`${issueEventServiceUrl}?${query}`, {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}

export const createIssueEvent = (token, props) => {
  return fetch(`${issueEventServiceUrl}`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ ...props, date: new Date() })
  })
}

export const removeIssueEvent = (token, id) => {
  return fetch(`${issueEventServiceUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}
