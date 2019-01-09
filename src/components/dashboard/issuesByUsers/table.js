import React from 'react'
import {
  List,
  ListSubheader,
  ListItem,
  Avatar,
  ListItemText
} from '@material-ui/core'
import Label from '../../common/label'
import UserAvatar from '../../common/user-avatar'
import { Link } from 'react-router-dom'

import { PriorityHigh, LowPriority, ReportProblem } from '@material-ui/icons'
import { red, orange, yellow, lightBlue } from '@material-ui/core/colors'
import { getDuration } from '../../../scripts'

const IssueList = props => {
  const { issues, title, height } = props
  const colors = [lightBlue[500], yellow[500], orange[500], red[500]]
  const icons = [
    <LowPriority />,
    <ReportProblem />,
    <PriorityHigh />,
    <PriorityHigh />
  ]

  if (!issues) return null

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader style={{ backgroundColor: '#fff' }} component="div">
          {title}
        </ListSubheader>
      }
      style={{ overflow: 'auto', height }}
    >
      {issues.map(issue => (
        <Link to={`/issues/${issue._id}`} style={{ textDecoration: 'none' }}>
          <ListItem disableGutters button>
            <Avatar
              style={{
                margin: 10,
                color: '#fff',
                backgroundColor: colors[issue.priority]
              }}
            >
              {icons[issue.priority]}
            </Avatar>

            <ListItemText
              style={{ padding: '0px' }}
              primary={
                <div>
                  {issue.title}

                  {issue.category && (
                    <Label key="category" label={{ text: issue.category.text }} />
                  )}

                  {issue.labels.map(label => (
                    <Label key={label._id} label={label} />
                  ))}
                </div>
              }
              secondary={`Bekleme süresi: ${getDuration(issue.createdAt)}`}
            />
          </ListItem>
        </Link>
      ))}
    </List>
  )
}

export default IssueList
