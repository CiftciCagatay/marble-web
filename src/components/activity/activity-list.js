import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Tooltip
} from '@material-ui/core'

import { Close as CloseIcon, Check as CheckIcon } from '@material-ui/icons'

import { withStyles } from '@material-ui/core/styles'

import _ from 'lodash'
import { connect } from 'react-redux'
import { getActivities } from '../../api'
import { updateAttendingStatusForActivity } from '../../actions'

import UserAvatar from '../common/user-avatar'
import { timeFormat } from '../../scripts'

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },

  expandOpen: {
    transform: 'rotate(180deg) !important'
  },

  cardContent: {
    maxHeight: '30vh',
    overflowY: 'scroll',
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  },

  card: {
    marginBottom: theme.spacing.unit * 2
  }
})

class ActivityList extends Component {
  state = {
    activities: []
  }

  componentDidMount() {
    this.fetchActivities()
  }

  fetchActivities = () =>
    getActivities(this.props.accessToken, { waitingForResponse: true })
      .then(response => response.json())
      .then(({ activities }) => this.setState({ activities }))

  onClickAttendingButton = (index, attending) => {
    const { _id } = this.state.activities[index]

    this.props.updateAttendingStatusForActivity(_id, attending).then(() => {
      let { activities } = this.state

      activities.splice(index, 1)

      this.setState({ activities })
    })
  }

  gotoActivity = date => {
    if (this.props.calendar) {
      this.props.calendar.gotoDate(date)
    }
  }

  render() {
    const { classes } = this.props

    if (this.state.activities.length === 0) return null

    return [
      <Card className={classes.card}>
        <CardHeader
          title="Yanıt Bekleyen Davetler"
          subheader={`${Object.keys(this.state.activities).length} davet`}
        />

        <CardContent className={classes.cardContent}>
          <List>
            {this.state.activities.map((activity, index) => {
              return (
                <ListItem
                  key={activity._id}
                  onClick={() => this.gotoActivity(activity.start)}
                  button
                >
                  <ListItemAvatar>
                    <UserAvatar user={activity.createdBy} />
                  </ListItemAvatar>

                  <ListItemText
                    primary={activity.title}
                    secondary={`${timeFormat(
                      activity.start,
                      'DD/MM/YYYY HH:mm'
                    )} - ${timeFormat(activity.end, 'DD/MM/YYYY HH:mm')}`}
                  />

                  <ListItemSecondaryAction>
                    <Tooltip title="Katılmayacağım">
                      <IconButton
                        onClick={() =>
                          this.onClickAttendingButton(index, false)
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Katılacağım">
                      <IconButton
                        onClick={() => this.onClickAttendingButton(index, true)}
                        color="primary"
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </CardContent>
      </Card>
    ]
  }
}

function mapStateToProps({ auth: { accessToken }, calendar: { calendar } }) {
  return { accessToken, calendar }
}

export default connect(
  mapStateToProps,
  { updateAttendingStatusForActivity }
)(withStyles(styles)(ActivityList))
