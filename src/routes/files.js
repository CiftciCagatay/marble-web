import React, { Component } from 'react'

import _ from 'lodash'
import { connect } from 'react-redux'
import { BPM_PORT, getFiles } from '../api'
import {
  GridList,
  GridListTile,
  Toolbar,
  InputBase,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Popover,
  Typography,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@material-ui/core'
import {
  Search as SearchIcon,
  DateRange as CalendarIcon,
  Close as CloseIcon,
  CloudDownload as DownloadIcon,
  ArrowForward as ShowDetailsIcon,
  ChevronLeft,
  ChevronRight
} from '@material-ui/icons'

import { Link } from 'react-router-dom'

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'
import { tr } from 'date-fns/locale'
import { timeFormat, timeDiff } from '../scripts'
import UserAvatar from '../components/common/user-avatar'
import moment from 'moment'

class FileShowcase extends Component {
  state = {
    index: -1
  }

  componentDidUpdate(prevProps) {
    if (this.props.index !== prevProps.index) {
      this.setState({ index: this.props.index })
    }
  }

  handleIndexChange = val => {
    let index = this.state.index + val

    if (index >= 0 && index < this.props.events.length) {
      this.setState({ index })
    }
  }

  render() {
    const { events, open, onClose } = this.props

    const { index } = this.state
    if (index === -1) return null

    const selectedEvent = events[index]
    if (!selectedEvent) return null

    return (
      <Dialog open={open} onClose={onClose} fullScreen>
        <Grid container item>
          <List style={{ width: '100%' }}>
            <ListItem>
              <ListItemAvatar>
                <UserAvatar user={selectedEvent.author} />
              </ListItemAvatar>

              <ListItemText
                primary={selectedEvent.author.name}
                secondary={timeDiff(selectedEvent.date)}
              />

              <ListItemSecondaryAction>
                <Tooltip title="Görev Detayları">
                  <Link to={`/issues/${selectedEvent.issueId}`}>
                    <IconButton>
                      <ShowDetailsIcon />
                    </IconButton>
                  </Link>
                </Tooltip>

                <Tooltip title="İndir">
                  <a
                    href={`http://arctory.tk:${BPM_PORT}${
                      selectedEvent.file.path
                    }`}
                    download
                  >
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                  </a>
                </Tooltip>

                <Tooltip title="Kapat">
                  <IconButton onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>

        <Grid container item xs spacing={16} alignItems="center">
          <Grid style={{ textAlign: 'center' }} item>
            <IconButton onClick={() => this.handleIndexChange(-1)}>
              <ChevronLeft />
            </IconButton>
          </Grid>

          <Grid item xs style={{ textAlign: 'center' }}>
            <div style={{ height: '250px', width: '100%' }}>
              <img
                src={`http://arctory.tk:${BPM_PORT}${selectedEvent.file.path}`}
                style={{ maxHeight: '250px', width: 'auto' }}
              />
            </div>
          </Grid>

          <Grid style={{ textAlign: 'center' }} item>
            <IconButton onClick={() => this.handleIndexChange(1)}>
              <ChevronRight />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <Typography align="center">{selectedEvent.comment}</Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          wrap="wrap"
          justify="space-around"
          style={{ overflow: 'hidden' }}
        >
          <Divider style={{ margin: '2px 0px 2px 0px' }} />
          <GridList
            style={{
              flexWrap: 'nowrap',
              transform: 'translateZ(0)',
              width: '100%'
            }}
            cellHeight={120}
            cols={10}
            spacing={8}
          >
            {events.map((event, index) => (
              <GridListTile
                key={event._id}
                onClick={() => this.setState({ index })}
              >
                <div
                  style={{
                    backgroundImage: `url(http://arctory.tk:${BPM_PORT}${
                      event.file.path
                    })`,
                    cursor: 'pointer',
                    height: '100%',
                    width: '100%',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </Dialog>
    )
  }
}

class Files extends Component {
  state = {
    events: [],
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    search: '',
    key: 'selection',
    showcaseOpen: false,
    selectedEventIndex: 0
  }

  componentDidMount() {
    this.fetchFiles()
  }

  handleSearchChange = e => {
    this.setState({ search: e.target.value }, () => this.fetchFiles())
  }

  handleDateRangeSelect = ({ selection }) => {
    this.setState({ ...selection }, () => {
      this.fetchFiles()
    })
  }

  fetchFiles = _.debounce(() => {
    const { startDate, endDate, search } = this.state

    return getFiles(this.props.accessToken, { startDate, endDate, search })
      .then(response => response.json())
      .then(({ results }) => this.setState({ events: results }))
  }, 250)

  render() {
    const { startDate, endDate, key, anchorEl } = this.state

    return (
      <div>
        <Paper>
          <Toolbar>
            <Grid container alignItems="center" spacing={8}>
              <Grid item>
                <SearchIcon />
              </Grid>

              <Grid item xs>
                <InputBase
                  value={this.state.search}
                  onChange={this.handleSearchChange}
                  placeholder="Ara"
                  fullWidth
                />
              </Grid>

              <Grid item>
                <Tooltip title="Eklenme Tarihi">
                  <IconButton
                    onClick={e => this.setState({ anchorEl: e.currentTarget })}
                  >
                    <CalendarIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </Paper>

        <Typography
          variant="caption"
          align="right"
          style={{ paddingTop: '4px' }}
        >
          {timeFormat(this.state.startDate, 'DD/MM/YYYY')} ile{' '}
          {timeFormat(this.state.endDate, 'DD/MM/YYYY')} arasında eklenmiş
          dosyalar listeleniyor.
        </Typography>

        <Popover
          id="simple-popper"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => this.setState({ anchorEl: null })}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <DateRange
            ranges={[{ startDate, endDate, key }]}
            onChange={this.handleDateRangeSelect}
            locale={tr}
            moveRangeOnFirstSelection={false}
          />
        </Popover>

        <GridList style={{ marginTop: '12px' }} cols={10} cellHeight={120}>
          {this.state.events.map((event, index) => (
            <GridListTile
              key={event._id}
              onClick={() =>
                this.setState({ selectedEventIndex: index, showcaseOpen: true })
              }
            >
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundImage: `url(http://arctory.tk:${BPM_PORT}${
                    event.file.path
                  })`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  cursor: 'pointer'
                }}
              />
            </GridListTile>
          ))}
        </GridList>

        <FileShowcase
          index={this.state.selectedEventIndex}
          open={this.state.showcaseOpen}
          onClose={() => this.setState({ showcaseOpen: false })}
          events={this.state.events}
        />
      </div>
    )
  }
}

function mapStateToProps({ auth: { accessToken } }) {
  return { accessToken }
}

export default connect(mapStateToProps)(Files)
