import { issueServiceUrl } from './config'

export const getHomePageReport = (token, { unit }) => {
  return fetch(`${issueServiceUrl}/reports/homePageReport?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export const getSolversGuildReport = (token, { unit }) => {
  return fetch(`${issueServiceUrl}/reports/solversGuild?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export const getProblemResourcesReport = (token, { unit }) => {
  return fetch(`${issueServiceUrl}/reports/problemResources?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export const getIssuesByUsersReport = token => {
  return fetch(`${issueServiceUrl}/reports/issuesByUsers`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  }).then(response => {
    if (!response.ok) throw new Error('Couldnt get report data!')

    return response.json()
  })
}
