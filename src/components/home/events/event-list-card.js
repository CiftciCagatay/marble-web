import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from '@material-ui/core'
import {
  AssignmentInd as AssignmentIcon,
  Comment as CommentIcon,
  Label as LabelAddIcon,
  LabelOff as LabelRemoveIcon,
  CheckCircle as ResolvedIcon
} from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { fetchIssueEvents } from '../../../actions'
import _ from 'lodash'

import { timeDiff } from '../../../scripts'

import { Link } from 'react-router-dom'

class EventsCard extends Component {
  componentDidMount() {
    this.props.fetchIssueEvents(null, 20, -1)
  }

  renderLabelEvent = event => {
    const { classes } = this.props

    return (
      <Fragment>
        <Typography class={classes.inline} component="span">
          {event.author.name}{' '}
        </Typography>

        <Typography class={classes.inline} component="span">
          {event.labels.map(label => `${label.text}, `)}
          {event.labels.length > 1 ? 'etiketlerini' : 'etiketini'}
        </Typography>

        <Typography class={classes.inline} component="span">
          {event.type === 'addLabel' ? ' ekledi.' : ' çıkardı.'}
        </Typography>
      </Fragment>
    )
  }

  renderCommentEvent = event => {
    const { classes } = this.props
    const maxCharCount = 140

    let text = ''

    if (event.comment) {
      text = `${event.comment.substring(0, maxCharCount)}${
        event.comment.length > maxCharCount ? '...' : ''
      }`
    } else if (event.file) {
      text = `${event.author.name} bir dosya yükledi.`
    }

    return (
      <Fragment>
        <Typography class={classes.inline} component="span">
          {text}
        </Typography>
      </Fragment>
    )
  }

  renderAssignEvent = event => {
    const { classes } = this.props

    return (
      <Fragment>
        <Typography class={classes.inline} component="span">
          {event.author.name} bir görevi,{' '}
        </Typography>

        <Typography class={classes.inline} component="span">
          {event.users.map(user => {
            user.name
          })}
          kullanıcıları
        </Typography>

        <Typography class={classes.inline} component="span">
          {event.type === 'assign' ? 'na atadı.' : 'ndan aldı.'}
        </Typography>
      </Fragment>
    )
  }

  renderResolveEvent = event => {
    const { classes } = this.props

    return (
      <Fragment>
        <Typography class={classes.inline} component="span">
          {event.author.name} bir görevi tamamlandı olarak işaretledi.
        </Typography>
      </Fragment>
    )
  }

  renderIcon = event => {
    switch (event.type) {
      case 'comment':
        return (
          <Avatar style={{ backgroundColor: 'steelblue', color: '#fff' }}>
            <CommentIcon />
          </Avatar>
        )
      case 'assign':
        return (
          <Avatar style={{ backgroundColor: 'steelblue', color: '#fff' }}>
            <AssignmentIcon />
          </Avatar>
        )
      case 'unassign':
        return (
          <Avatar style={{ backgroundColor: '#F44336', color: '#fff' }}>
            <AssignmentIcon />
          </Avatar>
        )
      case 'addLabel':
        return (
          <Avatar style={{ backgroundColor: 'steelblue', color: '#fff' }}>
            <LabelAddIcon />
          </Avatar>
        )
      case 'removeLabel':
        return (
          <Avatar style={{ backgroundColor: '#F44336', color: '#fff' }}>
            <LabelRemoveIcon />
          </Avatar>
        )
      case 'resolve':
        return (
          <Avatar style={{ backgroundColor: 'green', color: '#fff' }}>
            <ResolvedIcon />
          </Avatar>
        )
      default:
        return null
    }
  }

  renderDetail = event => {
    switch (event.type) {
      case 'comment':
        return this.renderCommentEvent(event)
      case 'assign':
      case 'unassign':
        return this.renderAssignEvent(event)
      case 'addLabel':
      case 'removeLabel':
        return this.renderLabelEvent(event)
      case 'resolve':
        return this.renderResolveEvent(event)
      default:
        return null
    }
  }

  renderListItem = event => {
    if (!event.issueId || !event.author) return null

    return (
      <Link to={`/issues/${event.issueId}`} style={{ textDecoration: 'none' }}>
        <ListItem alignItems="flex-start" button>
          <ListItemAvatar>
            <Avatar>{this.renderIcon(event)}</Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={this.renderDetail(event)}
            secondary={`${event.author.name} - ${timeDiff(event.date)}`}
          />
        </ListItem>
      </Link>
    )
  }

  renderList = () => {
    const { classes } = this.props

    return (
      <List className={classes.root}>
        {_.map(this.props.issueEvents, event => this.renderListItem(event))}
      </List>
    )
  }

  render() {
    return (
      <Card style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        <ListSubheader style={{ backgroundColor: '#fff' }}>
          Son Aktiviteler
        </ListSubheader>
        {this.renderList()}
      </Card>
    )
  }
}

EventsCard.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
})

const EventListCardWithStyle = withStyles(styles)(EventsCard)

function mapStateToProps({ issueEvents }) {
  return { issueEvents }
}

export default connect(
  mapStateToProps,
  { fetchIssueEvents }
)(EventListCardWithStyle)
