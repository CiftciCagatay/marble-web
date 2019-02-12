import React, { PureComponent } from 'react'

import { Calendar } from 'fullcalendar'
import 'fullcalendar/dist/fullcalendar.css'
import calendarOptions from './calendar-options.json'

import {
  fetchActivities,
  configureCalendar,
  destroyCalendar,
  updateActivity
} from '../../actions'
import _ from 'lodash'
import { connect } from 'react-redux'

import {
  Toolbar,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuList
} from '@material-ui/core'
import {
  ChevronLeft,
  ChevronRight,
  Settings as SettingsIcon,
  Check as CheckIcon
} from '@material-ui/icons'

import { timeFormat } from '../../scripts/index.js'
import moment from 'moment'

class MyCalendar extends PureComponent {
  state = {
    view: calendarOptions.defaultView,
    title: '',
    settingsAnchorEl: null
  }

  componentDidMount() {
    this.props.fetchActivities().then(() => this.configureCalendar())
  }

  onChangeView = view => {
    this.setState({ view }, () => {
      this.props.calendar.changeView(view)
      this.configureTitle()
    })
  }

  onEventDrop = info => {
    const {
      event: { start, end, id }
    } = info

    //this.props.updateActivity(id, { start, end })
  }

  configureCalendar = () => {
    const calendarEl = document.getElementById('calendar')

    if (this.props.calendar !== null) this.props.destroyCalendar()

    const calendar = new Calendar(calendarEl, {
      ...calendarOptions,

      columnHeaderHtml: function(date) {
        return `
          <div style={{ textAlign: 'center' }}>
            <div>${timeFormat(date, 'dddd')}</div>
            <div>${timeFormat(date, 'D')}</div>
          </div>
        `
      },

      selectAllow: ({ allDay, start, end }) => {
        if (allDay) return true

        return moment(start).isSame(end, 'day')
      },

      events: _.map(this.props.activities, activity => {
        const user = activity.participants[this.props.user._id]

        if (!user) return activity

        const { waitingForResponse, attending } = user

        return {
          ...activity,
          id: activity._id,
          backgroundColor: attending ? '#0F796B' : '#FFF',
          textColor: attending ? '#FFF' : '#000',
          borderColor: waitingForResponse || attending ? '#0F796B' : '#e52020',
          editable: activity.createdBy._id === user._id || activity.canEdit,
          allDay:
            activity.allDay ||
            !moment(activity.start).isSame(activity.end, 'day')
        }
      }),

      eventReceive: this.props.onEventReceive,

      select: this.props.onSelect,

      eventClick: this.props.onClickEvent,

      eventResize: ({ event: { start, end, id } }) =>
        this.props.updateActivity(id, { start, end }),

      eventDrop: this.onEventDrop
    })

    this.props.configureCalendar(calendar)

    this.configureTitle()

    calendar.render()
  }

  configureTitle = () => {
    let date = new Date()

    if (this.props.calendar) {
      date = this.props.calendar.getDate()
    }

    this.setState({ title: timeFormat(date, 'MMMM YYYY') })
  }

  render() {
    const { settingsAnchorEl } = this.state

    return (
      <Card>
        <Toolbar>
          <Grid spacing={16} alignItems="center" container>
            <Grid item>
              <Button
                onClick={() => {
                  this.props.calendar.today()
                  this.configureTitle()
                }}
                variant="outlined"
              >
                Bugün
              </Button>
            </Grid>

            <Grid item>
              <IconButton
                onClick={() => {
                  this.props.calendar.prev()
                  this.configureTitle()
                }}
              >
                <ChevronLeft />
              </IconButton>

              <IconButton
                onClick={() => {
                  this.props.calendar.next()
                  this.configureTitle()
                }}
              >
                <ChevronRight />
              </IconButton>
            </Grid>

            <Grid xs item>
              <Typography variant="h6">{this.state.title}</Typography>
            </Grid>

            {/*
              <Grid item>
                <Tooltip title="Ayarlar">
                  <IconButton
                    onClick={e =>
                      this.setState({ settingsAnchorEl: e.currentTarget })
                    }
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={settingsAnchorEl}
                  open={Boolean(settingsAnchorEl)}
                  onClose={() => this.setState({ settingsAnchorEl: null })}
                >
                  <MenuItem>Haftasonlarını Göster</MenuItem>

                  <MenuItem>Reddedilen Etkinlikleri Göster</MenuItem>
                </Menu>
              </Grid>
            */}

            <Grid item>
              <Select
                onChange={e => this.onChangeView(e.target.value)}
                value={this.state.view}
              >
                <MenuItem value="month">Ay</MenuItem>
                <MenuItem value="agendaWeek">Hafta</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Toolbar>

        <CardContent style={{ height: '70vh' }}>
          <div id="calendar" />
        </CardContent>
      </Card>
    )
  }
}

function mapStateToProps({
  activities,
  users: { user },
  calendar: { calendar }
}) {
  return { activities, user, calendar }
}

export default connect(
  mapStateToProps,
  { fetchActivities, configureCalendar, destroyCalendar, updateActivity }
)(MyCalendar)
