import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, ListItem, ListItemText, Typography } from '@material-ui/core'
import Label from '../common/label'
import UserAvatar from '../common/user-avatar'
import { timeDiff, timeFormat, getDuration } from '../../scripts'

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
            <div>
              <Typography variant="subtitle1">{issue.title}</Typography>
              
              {issue.summary && (
                <Typography variant="body2" color="error">{issue.summary}</Typography>
              )}

              {issue.deadline && (
                <Typography variant="body2" color="error">
                  {'Teslim tarihi : ' +
                    timeFormat(issue.deadline, 'DD/MM/YYYY')}
                </Typography>
              )}

              <Grid container justify="space-between">
                <Grid item>
                  <Label
                    key={issue.priority}
                    label={priorities[issue.priority]}
                  />

                  {issue.labels.map(label => (
                    <Label key={label._id} label={label} />
                  ))}
                </Grid>

                <Grid item>
                  <Grid container>
                    {issue.assignees.map(user => (
                      <UserAvatar key={user._id} user={user} small />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          }
          secondary={
            <div>
              <Typography variant="caption" component="span">
                {'Son güncellenme : ' + timeDiff(issue.updatedAt)}
              </Typography>

              <Typography variant="caption" component="span">
                {'Oluşturulma Tarihi : ' +
                  timeFormat(issue.createdAt, 'DD/MM/YYYY HH:mm:ss')}
              </Typography>

              <Typography variant="caption" component="span">
                {'Bekleme süresi : ' + getDuration(issue.createdAt)}
              </Typography>
            </div>
          }
          style={{ width: '100%' }}
        />
      </ListItem>
    </Link>
  )
}

export default IssueListItem
