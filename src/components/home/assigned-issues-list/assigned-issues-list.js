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
import { withStyles } from '@material-ui/core/styles'

import {
  PriorityHigh as PriorityHighIcon,
  Grade as StarIcon
} from '@material-ui/icons'
import { red, yellow } from '@material-ui/core/colors'

import { connect } from 'react-redux'
import { getIssues } from '../../../api'

import UserAvatar from '../../common/user-avatar'
import { Link } from 'react-router-dom'
import { timeFormat } from '../../../scripts'
import _ from 'lodash'

const styles = theme => ({
  list: {
    backgroundColor: theme.palette.background.paper
  },
  root: {
    maxHeight: '400px',
    overflowY: 'scroll'
  },
  priorityHighIcon: {
    color: red[500]
  },
  starAvatar: {
    color: yellow[500],
    margin: 'auto'
  },
  noIssueCard: {
    padding: '12px'
  }
})

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
    const { classes } = this.props

    return (
      <Paper className={classes.noIssueCard}>
        <Avatar className={classes.starAvatar}>
          <StarIcon />
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

    const { classes } = this.props

    return (
      <Card className={classes.root}>
        <List className={classes.list} subheader={<li />}>
          <ListSubheader>Bana Atanan Görevler</ListSubheader>

          {this.state.issues.map(issue => (
            <Link key={issue._id} to={`/issues/${issue._id}`}>
              <ListItem key={issue._id} button>
                <UserAvatar user={issue.createdBy} />
                <ListItemText
                  primary={issue.title}
                  secondary={timeFormat(issue.createdAt, 'DD/MM/YYYY HH:mm:ss')}
                />

                <ListItemSecondaryAction>
                  {issue.priority === 3 && (
                    <Tooltip title="Yüksek Öncelikli Görev">
                      <PriorityHighIcon className={classes.priorityHighIcon} />
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

export default connect(mapStateToProps)(withStyles(styles)(AssignedIssueList))
