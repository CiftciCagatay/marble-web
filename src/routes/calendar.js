import React, { Component, Fragment } from 'react'

import { Grid, Fab, Tooltip } from '@material-ui/core'

import { fetchActivities, createActivity } from '../actions'
import { connect } from 'react-redux'
import _ from 'lodash'

import ActivityDetailsDialog from '../components/activity/activity-details-dialog'
import MyCalendar from '../components/activity/calendar'
import DraggableTaskList from '../components/activity/draggable-task-list'
import ActivityFormDialog from '../components/activity/activity-form-dialog'
import ActivityList from '../components/activity/activity-list'
import moment from 'moment'

import { Help as HelpIcon, Add as AddIcon } from '@material-ui/icons'
import { blue } from '@material-ui/core/colors'

import calendarHelpOptions from './calendar.help.json'

import HelpDialog from '../components/common/help-dialog'

class Calendar extends Component {
  state = {
    activityDialogOpen: false,
    selectedActivity: null,

    activityFormTemp: {},
    activityFormDialogOpen: false,
    activityFormMode: 'create',

    helpDialogOpen: false
  }

  onSelectTimeRange = ({ start, end, allDay }) => {
    this.setState({
      activityFormTemp: { start, end, allDay },
      activityFormDialogOpen: true,
      activityFormMode: 'create'
    })
  }

  onEventReceive = event => {
    const { id: issueId, start, title } = event
    const { _id, name } = this.props.user

    event.remove()

    const activity = {
      issueId,
      title,
      participants: [{ _id, name, waitingForResponse: false, attending: true }],
      start,
      end: moment(start)
        .add(1, 'hours')
        .toDate()
    }

    this.props.createActivity(activity)
  }

  render() {
    const {
      selectedActivity,
      activityDialogOpen,

      activityFormTemp,
      activityFormDialogOpen,
      activityFormMode
    } = this.state

    return [
      <Grid spacing={32} container>
        <Grid sm={12} md={4} item>
          <ActivityList />

          <DraggableTaskList />
        </Grid>

        <Grid sm={12} md={8} item>
          <MyCalendar
            onClickEvent={({ event }) =>
              this.setState({
                selectedActivity: this.props.activities[event.id],
                activityDialogOpen: true
              })
            }
            onSelect={this.onSelectTimeRange}
            onEventReceive={({ event }) => this.onEventReceive(event)}
          />
        </Grid>
      </Grid>,

      <ActivityDetailsDialog
        activity={selectedActivity}
        open={activityDialogOpen}
        onClose={() =>
          this.setState({ activityDialogOpen: false, selectedActivity: null })
        }
        pushTaskDetails={() =>
          this.props.history.push(`issues/${selectedActivity.issueId}`)
        }
      />,

      <ActivityFormDialog
        open={activityFormDialogOpen}
        mode={activityFormMode}
        activity={activityFormTemp}
        onClose={() =>
          this.setState({
            activityFormDialogOpen: false,
            activityFormTemp: {}
          })
        }
      />,

      <HelpDialog
        options={calendarHelpOptions}
        open={this.state.helpDialogOpen}
        onClose={() => this.setState({ helpDialogOpen: false })}
      />,

      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          zIndex: 50
        }}
      >
        <Tooltip title="Yardım">
          <Fab
            onClick={() => this.setState({ helpDialogOpen: true })}
            style={{
              marginRight: '12px',
              backgroundColor: blue[700],
              color: '#fff'
            }}
            aria-help="Yardım"
          >
            <HelpIcon />
          </Fab>
        </Tooltip>

        <Fab
          onClick={() =>
            this.setState({
              activityFormDialogOpen: true,
              activityFormMode: 'create',
              activityFormTemp: {}
            })
          }
          variant="extended"
          color="primary"
          aria-help="Yardım"
        >
          <AddIcon />
          Etkinlik Oluştur
        </Fab>
      </div>
    ]
  }
}

function mapStateToProps({ activities, users: { user } }) {
  return { activities, user }
}

export default connect(
  mapStateToProps,
  { fetchActivities, createActivity }
)(Calendar)
