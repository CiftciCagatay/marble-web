import { mapKeys } from 'lodash'
import {
  ACTIVITY_CREATED,
  CALENDAR_CONFIGURED,
  CALENDAR_DESTROYED,
  ACTIVITY_REMOVED
} from '../actions/types'

const INITIAL_STATE = {
  calendar: null
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CALENDAR_CONFIGURED:
      return { calendar: action.payload }

    case CALENDAR_DESTROYED:
      state.calendar.destroy()
      return INITIAL_STATE

    case ACTIVITY_CREATED:
      let { participants, ...activity } = action.payload
      participants = mapKeys(action.payload.participants, '_id')

      const { waitingForResponse, attending } = participants[
        activity.createdBy._id
      ]

      state.calendar.addEvent({
        ...activity,
        id: activity._id,
        participants,
        backgroundColor: attending ? '#0F796B' : '#FFF',
        textColor: attending ? '#FFF' : '#000',
        borderColor: waitingForResponse || attending ? '#0F796B' : '#e52020'
      })

      return state

    case ACTIVITY_REMOVED:
      const event = state.calendar.getEventById(action.payload._id)
      event.remove()

      return state

    default:
      return state
  }
}
