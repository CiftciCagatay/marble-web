import React from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core'

import {
  GroupWork as MeetingIcon,
  PinDrop as VisitIcon,
  Assignment as TaskIcon
} from '@material-ui/icons'

import _ from 'lodash'
import { timeDiff } from '../../../scripts'

import activities from '../../../mocks/activities.json'

export default function(props) {
  const icons = {
    meeting: <MeetingIcon />,
    task: <TaskIcon />,
    visit: <VisitIcon />
  }
  
  return (
    <List>
      {_.map(activities, activity => (
        <ListItem button>
          <ListItemAvatar>
            <Avatar>{icons[activity.type]}</Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={activity.title}
            secondary={timeDiff(activity.date)}
          />
        </ListItem>
      ))}
    </List>
  )
}
