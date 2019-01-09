import React, { Component } from 'react'
import {
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
  Tooltip,
  Paper,
  Typography,
  Avatar
} from '@material-ui/core'

import { PriorityHigh, Grade } from '@material-ui/icons'
import { red, yellow } from '@material-ui/core/colors'

import { connect } from 'react-redux'
import { fetchIssues, cleanIssuesFromRedux } from '../../../actions'

import UserAvatar from '../../common/user-avatar'
import { Link } from 'react-router-dom'
import { timeFormat } from '../../../scripts'
import _ from 'lodash'

class AssignedIssueList extends Component {
  componentDidMount() {
    this.props.fetchIssues({
      assignees: [this.props.user._id],
      orderBy: 'createdAt'
    })
  }

  renderNoIssueCard = () => {
    return (
      <Paper style={{ padding: '12px' }}>
        <Avatar style={{ color: yellow[500], margin: 'auto' }}>
          <Grade />
        </Avatar>

        <Typography component="p" variant="body1" align="center">
          Sana atanmış herhangi bir görev bulunamadı!
        </Typography>
      </Paper>
    )
  }

  render() {
    if (this.props.issues.length === 0) {
      return this.renderNoIssueCard()
    }

    return (
      <Card style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        <List>
          <ListSubheader style={{ backgroundColor: '#fff' }}>
            Bana Atanan Görevler
          </ListSubheader>

          {this.props.issues.map(issue => (
            <Link
              to={`/issues/${issue._id}`}
              style={{ textDecoration: 'none' }}
            >
              <ListItem key={issue._id} button>
                <UserAvatar user={issue.createdBy} />
                <ListItemText
                  primary={issue.title}
                  secondary={timeFormat(issue.createdAt, 'DD/MM/YYYY HH:mm:ss')}
                />

                <ListItemSecondaryAction>
                  {issue.priority === 3 && (
                    <Tooltip title="Yüksek Öncelikli Görev">
                      <PriorityHigh style={{ color: red[500] }} />
                    </Tooltip>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))}
        </List>
      </Card>
    )
  }
}

function mapStateToProps({ issues, users: { user } }) {
  return { issues: _.toArray(issues), user }
}

export default connect(
  mapStateToProps,
  { fetchIssues, cleanIssuesFromRedux }
)(AssignedIssueList)
