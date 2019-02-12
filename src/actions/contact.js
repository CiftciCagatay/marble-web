import {
  CONTACTS_FETCHED,
  CONTACT_CREATED,
  CONTACT_UPDATED,
  CONTACT_REMOVED
} from './types'

import { getContacts, postContact, putContact, deleteContact } from '../api'

export const fetchContacts = () => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return getContacts(accessToken)
      .then(response => response.json())
      .then(({ contacts }) => dispatch({ type: CONTACTS_FETCHED, payload: contacts }))
      .catch(err => console.log(err))
  }
}

export const createContact = props => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return postContact(accessToken, props)
      .then(response => response.json())
      .then(({ contact }) =>
        dispatch({ type: CONTACT_CREATED, payload: { ...props, ...contact } })
      )
      .catch(err => console.log(err))
  }
}

export const updateContact = (_id, props) => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return putContact(accessToken, _id, props)
      .then(response => response.json())
      .then(() => dispatch({ type: CONTACT_UPDATED, payload: { ...props, _id } }))
      .catch(err => console.log(err))
  }
}

export const removeContact = _id => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken }
    } = getState()

    return deleteContact(accessToken, _id)
      .then(response => response.json())
      .then(() => dispatch({ type: CONTACT_REMOVED, payload: { _id } }))
      .catch(err => console.log(err))
  }
}
