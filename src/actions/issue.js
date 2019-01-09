import {
  CLEAN_ISSUES,
  ISSUES_FETCHED,
  MORE_ISSUES_FETCHED,
  ISSUE_CREATED,
  ISSUE_UPDATED,
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
  updateIssue
} from '../api'

export function cleanIssuesFromRedux() {
  return dispatch => dispatch({ type: CLEAN_ISSUES })
}

export function fetchIssues(props, append = false) {
  return (dispatch, getState) => {
    const {
      auth: { token }
    } = getState()

    let query = {
      isOpen: true,
      limit: 200,
      offset: 0,
      orderBy: 'createdAt',
      ...props
    }

    const type = append ? MORE_ISSUES_FETCHED : ISSUES_FETCHED

    return getIssues(token, query)
      .then(response => {
        if (!response.ok) throw new Error('')

        return response.json()
      })
      .then(({ result }) => {
        dispatch({ type, payload: result })
      })
      .catch(error => console.log(error))
  }
}

export function fetchIssueById(_id) {
  return (dispatch, getState) => {
    const {
      auth: { token }
    } = getState()

    return getIssueById(token, _id)
      .then(response => {
        if (!response.ok) throw new Error('')

        return response.json()
      })
      .then((res) => {
        console.log(res)

        const { result } = res 
        if (!result) throw new Error()

        dispatch({ type: ISSUES_FETCHED, payload: [result] })
      })
  }
}

export function postIssue(props) {
  return (dispatch, getState) => {
    const {
      auth: { token },
      users: { user }
    } = getState()

    return createIssue(token, {
      ...props,
      createdAt: new Date(),
      createdBy: user
    })
      .then(response => {
        if (!response.ok) throw new Error('Issue couldnt created.')

        return response.json()
      })
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
      auth: { token },
      issues
    } = getState()

    return updateIssue(token, issueId, props)
      .then(response => {
        if (!response.ok) throw new Error('Issue couldnt updated.')

        dispatch({
          type: ISSUE_UPDATED,
          payload: { ...issues[issueId], ...props }
        })

        return Promise.resolve()
      })
      .catch(error => {
        return Promise.reject()
      })
  }
}

export function removeIssue(issueId) {
  return (dispatch, getState) => {
    const {
      auth: { token }
    } = getState()

    return deleteIssue(token, issueId)
      .then(response => {
        if (!response.ok) throw new Error('Issue couldnt removed.')

        dispatch({
          type: ISSUE_REMOVED,
          payload: issueId
        })

        return Promise.resolve()
      })
      .catch(error => {
        return Promise.reject()
      })
  }
}

export function getLabelList({ unit }) {
  return (dispatch, getState) => {
    const {
      auth: { token }
    } = getState()

    getLabels(token, { unit })
      .then(response => {
        if (!response.ok) throw new Error('')

        return response.json()
      })
      .then(({ result }) => {
        dispatch({ type: LABELS_FETCHED, payload: result })
      })
      .catch(error => console.log(error))
  }
}

export function updateAssigneesAction(issueId, assignees) {
  return (dispatch, getState) => {
    const {
      auth: { token }
    } = getState()

    return updateAssignees(token, issueId, assignees)
      .then(response => {
        if (!response.ok) throw new Error('Assignees couldnt updated.')

        return response.json()
      })
      .then(data => {
        dispatch({ type: ASSIGNEES_UPDATED, payload: { issueId, assignees } })
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
      auth: { token }
    } = getState()

    return updateLabels(token, issueId, labels)
      .then(response => {
        if (!response.ok) throw new Error('Labels couldnt updated.')

        return response.json()
      })
      .then(data => {
        dispatch({ type: LABELS_UPDATED, payload: { issueId, labels } })
        return Promise.resolve()
      })
      .catch(err => {
        console.log(err)
        return Promise.reject()
      })
  }
}
