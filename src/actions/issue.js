import {
  CLEAN_ISSUES,
  ISSUES_FETCHED,
  MORE_ISSUES_FETCHED,
  ISSUE_CREATED,
  ISSUE_UPDATED,
  ISSUE_STATUS_UPDATED,
  ISSUE_REMOVED,
  ASSIGNEES_UPDATED,
  LABELS_UPDATED,
  LABELS_FETCHED
} from './'

import {
  getIssues,
  getIssueById,
  createIssue,
  deleteIssue,
  getLabels,
  updateAssignees,
  updateLabels,
  updateIssue,
  updateIssueStatus
} from '../api'

export function cleanIssuesFromRedux() {
  return dispatch => dispatch({ type: CLEAN_ISSUES })
}

export function fetchIssues(props, append = false) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    let query = {
      isOpen: true,
      limit: 200,
      offset: 0,
      orderBy: 'createdAt',
      ...props
    }

    const type = append ? MORE_ISSUES_FETCHED : ISSUES_FETCHED

    return getIssues(accessToken, query)
      .then(response => response.json())
      .then(({ result }) => {
        dispatch({ type, payload: result })
      })
      .catch(error => console.log(error))
  }
}

export function fetchIssueById(_id) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getIssueById(accessToken, _id)
      .then(response => response.json())
      .then(res => {
        const { result } = res
        if (!result) throw new Error()

        dispatch({ type: ISSUES_FETCHED, payload: [result] })
      })
  }
}

export function postIssue(props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken },
      users: { user }
    } = getState()

    return createIssue(accessToken, {
      ...props,
      createdAt: new Date(),
      createdBy: user
    })
      .then(response => response.json())
      .then(({ result }) => {
        dispatch({ type: ISSUE_CREATED, payload: result })
        return Promise.resolve({ _id: result._id })
      })
      .catch(error => {
        console.log(error)
        return Promise.reject()
      })
  }
}

export function putIssue(issueId, props) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken },
      issues
    } = getState()

    return updateIssue(accessToken, issueId, props)
      .then(() => {
        dispatch({
          type: ISSUE_UPDATED,
          payload: { ...issues[issueId], ...props }
        })

        return Promise.resolve()
      })
      .catch(() => {
        return Promise.reject()
      })
  }
}

export function putIssueStatus(issueId, isOpen) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken },
      issues
    } = getState()

    return updateIssueStatus(accessToken, issueId, isOpen)
      .then(() => {
        dispatch({
          type: ISSUE_STATUS_UPDATED,
          payload: { issueId, isOpen }
        })

        return Promise.resolve()
      })
      .catch(() => {
        return Promise.reject()
      })
  }
}

export function removeIssue(issueId) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteIssue(accessToken, issueId)
      .then(() => {
        dispatch({
          type: ISSUE_REMOVED,
          payload: issueId
        })

        return Promise.resolve()
      })
      .catch(() => {
        return Promise.reject()
      })
  }
}

export function getLabelList({ unit }) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    getLabels(accessToken, { unit })
      .then(response => response.json())
      .then(({ result }) => {
        dispatch({ type: LABELS_FETCHED, payload: result })
      })
      .catch(error => console.log(error))
  }
}

export function updateAssigneesAction(issueId, assignees) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return updateAssignees(accessToken, issueId, assignees)
      .then(response => response.json())
      .then(events => {
        dispatch({
          type: ASSIGNEES_UPDATED,
          payload: { issueId, assignees, events }
        })
        return Promise.resolve()
      })
      .catch(err => {
        console.log(err)
        return Promise.reject()
      })
  }
}

export function updateLabelsAction(issueId, labels) {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return updateLabels(accessToken, issueId, labels)
      .then(response => response.json())
      .then(events => {
        dispatch({ type: LABELS_UPDATED, payload: { issueId, labels, events } })
        return Promise.resolve()
      })
      .catch(err => {
        console.log(err)
        return Promise.reject()
      })
  }
}
