import {
  ACTIVITIES_FETCHED,
  ACTIVITY_CREATED,
  ACTIVITY_UPDATED,
  ACTIVITY_REMOVED,
  ACTIVITY_ATTENDING_STATUS_CHANGED,
  PARTICIPANTS_ADDED,
  PARTICIPANTS_REMOVED
} from '../actions/types'
import { mapKeys, map } from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case ACTIVITIES_FETCHED:
      const activities = action.payload.map(activity => ({
        ...activity,
        participants: mapKeys(activity.participants, '_id')
      }))

      return mapKeys(activities, '_id')

    case ACTIVITY_CREATED:
      return {
        ...state,
        [action.payload._id]: {
          ...action.payload,
          participants: mapKeys(action.payload.participants, '_id')
        }
      }

    case ACTIVITY_UPDATED:
      return {
        ...state,
        [action.payload._id]: {
          ...state[action.payload._id],
          ...action.payload
        }
      }

    case PARTICIPANTS_ADDED:
      return {
        ...state,
        [action.payload.activityId]: {
          ...state[action.payload.activityId],
          participants: {
            ...state[action.payload.activityId].participants,
            ...mapKeys(action.payload.users, '_id')
          }
        }
      }

    case PARTICIPANTS_REMOVED:
      return {
        ...state,
        [action.payload.activityId]: {
          ...state[action.payload.activityId],
          participants: map(p => p).filter(
            ({ _id }) => action.payload.userIds.indexOf(_id) === -1
          )
        }
      }

    case ACTIVITY_ATTENDING_STATUS_CHANGED:
      let updatedActivity = state[action.payload._id]
      const participant = updatedActivity.participants[action.payload.userId]

      updatedActivity.participants[action.payload.userId] = {
        ...participant,
        waitingForResponse: false,
        attending: action.payload.attending
      }

      return { ...state, [action.payload._id]: updatedActivity }

    case ACTIVITY_REMOVED:
      const { [action.payload._id]: _, ...newState } = state
      return { ...newState }

    default:
      return state
  }
}
