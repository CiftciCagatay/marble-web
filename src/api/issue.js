import { issueServiceUrl } from './config'

//
// CRUD Issue
// props { isOpen, unitId, limit, offset, orderBy, createdBy, solvedBy }
export const getIssues = (token, props) => {
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
      Authorization: token
    }
  })
}

export const getIssueById = (token, _id) => {
  return fetch(`${issueServiceUrl}/${_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export const getIssueCount = (token, props) => {
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
      Authorization: token
    }
  })
}

export const createIssue = (token, props) => {
  return fetch(`${issueServiceUrl}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(props)
  })
}

export const deleteIssue = (token, id) => {
  return fetch(`${issueServiceUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export const updateIssue = (token, issueId, props) => {
  return fetch(`${issueServiceUrl}/${issueId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(props)
  })
}

export const updateLabels = (token, id, labels) => {
  return fetch(`${issueServiceUrl}/${id}/labels`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({ labels })
  })
}

export const updateAssignees = (token, id, assignees) => {
  return fetch(`${issueServiceUrl}/${id}/assignees`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({ assignees })
  })
}
