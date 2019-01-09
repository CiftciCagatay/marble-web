import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from '@material-ui/core'
import Label from '../common/label'
import UserAvatar from '../common/user-avatar'
import UserAvatarGrid from '../common/user-avatar-grid'
import { timeDiff, timeFormat, getDuration } from '../../scripts'
import moment from 'moment'

const IssueListItem = props => {
  const { issue } = props
  const priorities = [
    {
      text: 'Düşük',
      color: 'skyblue'
    },
    {
      text: 'Normal',
      color: 'green'
    },
    {
      text: 'Yüksek',
      color: 'orange'
    },
    {
      text: 'Kritik',
      color: 'red'
    }
  ]

  if (!issue._id) return null

  return (
    <Link to={`/issues/${issue._id}`} style={{ textDecoration: 'none' }}>
      <ListItem button>
        <UserAvatar user={issue.createdBy} />
        <ListItemText
          primary={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                {issue.title}
                <Label
                  key={issue.priority}
                  label={priorities[issue.priority]}
                />
                
                {issue.labels.map(label => (
                  <Label key={label._id} label={label} />
                ))}
              </div>

              <div style={{ display: 'flex' }}>
                {issue.assignees.map(user => (
                  <UserAvatar user={user} small />
                ))}
              </div>
            </div>
          }
          secondary={
            <div>
              <p style={{ margin: '0px' }}>
                {'Son güncellenme : ' + timeDiff(issue.updatedAt)}
              </p>
              <p style={{ margin: '0px' }}>
                {'Oluşturulma Tarihi : ' +
                  timeFormat(issue.createdAt, 'DD/MM/YYYY HH:mm:ss')}
              </p>
              <p style={{ margin: '0px' }}>
                {'Bekleme süresi : ' + getDuration(issue.createdAt)}
              </p>
            </div>
          }
          style={{ width: '100%' }}
        />
      </ListItem>
    </Link>
  )
}

export default IssueListItem
