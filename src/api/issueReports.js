import { issueServiceUrl } from './config'
import fetch from '../scripts/fetch'

export const getHomePageReport = (accessToken, { unit }) => {
  return fetch(`${issueServiceUrl}/reports/homePageReport?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const getSolversGuildReport = (accessToken, { unit }) => {
  return fetch(`${issueServiceUrl}/reports/solversGuild?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const getProblemResourcesReport = (accessToken, { unit }) => {
  return fetch(`${issueServiceUrl}/reports/problemResources?unit=${unit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
}

export const getIssuesByUsersReport = accessToken => {
  return fetch(`${issueServiceUrl}/reports/issuesByUsers`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  }).then(response => {
    if (!response.ok) throw new Error('Couldnt get report data!')

    return response.json()
  })
}
