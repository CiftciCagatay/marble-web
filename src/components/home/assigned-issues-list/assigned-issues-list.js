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
import { getIssues } from '../../../api'

import UserAvatar from '../../common/user-avatar'
import { Link } from 'react-router-dom'
import { timeFormat } from '../../../scripts'
import _ from 'lodash'

class AssignedIssueList extends Component {
  state = {
    issues: []
  }

  componentDidMount() {
    getIssues(this.props.accessToken, {
      isOpen: true,
      assignees: [this.props.user._id],
      orderBy: 'createdAt',
      limit: 10
    })
      .then(response => response.json())
      .then(({ result }) => this.setState({ issues: result }))
      .catch(e => console.log(e))
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
    if (this.state.issues.length === 0) {
      return this.renderNoIssueCard()
    }

    return (
      <Card style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        <List>
          <ListSubheader style={{ backgroundColor: '#fff' }}>
            Bana Atanan Görevler
          </ListSubheader>

          {this.state.issues.map(issue => (
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

function mapStateToProps({ auth: { accessToken }, users: { user } }) {
  return { accessToken, user }
}

export default connect(mapStateToProps)(AssignedIssueList)
