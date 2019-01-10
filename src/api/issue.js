import { issueServiceUrl } from './config'

//
// CRUD Issue
// props { isOpen, unitId, limit, offset, orderBy, createdBy, solvedBy }
export const getIssues = (accessToken, props) => {
  let queryString = ''

  Object.keys(props).forEach(key => {
    if (typeof props[key] === 'undefined') return

    if (props[key] === '') return

    if (key === 'labels' && props[key].length === 0) return
    if (key === 'assignees' && props[key].length === 0) return
    if (key === 'orderBy' && props[key] === 'createdAt') return

    if (queryString) queryString += '&'

    if (key === 'labels' || key === 'assignees') {
      try {
        queryString += `${key}=${JSON.stringify(props[key])}`
      } catch (error) {}
      return
    }

    queryString += `${key}=${props[key]}`
  })

  return fetch(`${issueServiceUrl}?${queryString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const getIssueById = (accessToken, _id) => {
  return fetch(`${issueServiceUrl}/${_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const getIssueCount = (accessToken, props) => {
  let queryString = ''

  Object.keys(props).forEach(key => {
    if (typeof props[key] === 'undefined') return

    if (props[key] === '') return

    if (key === 'labels' && props[key].length === 0) return
    if (key === 'assignees' && props[key].length === 0) return
    if (key === 'orderBy' && props[key] === 'createdAt') return

    if (queryString) queryString += '&'

    if (key === 'labels' || key === 'assignees') {
      try {
        queryString += `${key}=${JSON.stringify(props[key])}`
      } catch (error) {}
      return
    }

    queryString += `${key}=${props[key]}`
  })

  return fetch(`${issueServiceUrl}/count?${queryString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const createIssue = (accessToken, props) => {
  return fetch(`${issueServiceUrl}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export const deleteIssue = (accessToken, id) => {
  return fetch(`${issueServiceUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const updateIssue = (accessToken, issueId, props) => {
  return fetch(`${issueServiceUrl}/${issueId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(props)
  })
}

export const updateLabels = (accessToken, id, labels) => {
  return fetch(`${issueServiceUrl}/${id}/labels`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify({ labels })
  })
}

export const updateAssignees = (accessToken, id, assignees) => {
  return fetch(`${issueServiceUrl}/${id}/assignees`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify({ assignees })
  })
}
