import React, { Component } from 'react'
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  ListItemText
} from '@material-ui/core'
import {
  Notifications,
  Refresh,
  Check,
  Comment,
  Update,
  AssignmentInd
} from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchNotifications,
  markNotificationsRead,
  fetchIssueById
} from '../../../actions'
import _ from 'lodash'

class NotificationButton extends Component {
  state = { open: false, anchorEl: null }
  notifications = []

  componentDidMount() {

  }

  getNotificationIconAndLabel = notification => {
    if (!notification || !notification.data)
      return {
        icon: null,
        label: ''
      }

    const { type, author, labels } = notification.data

    const name = author ? author.name : ''

    switch (type) {
      case 'reopened':
        return {
          icon: <Refresh />,
          label: `${name} bir işi yeniden açtı.`
        }

      case 'resolved':
        return {
          icon: <Check />,
          label: `${name} bir işi çözüldü olarak işaretledi.`
        }

      case 'assign':
        return {
          icon: <AssignmentInd />,
          label: `${name} size bir iş atadı.`
        }

      case 'unassign':
        return {
          icon: <AssignmentInd />,
          label: `${name} sizi bir işten aldı.`
        }

      case 'addLabel':
        return {
          icon: <AssignmentInd />,
          label: `${name} ${labels
            .map(({ text }) => text)
            .join(', ')} etiketlerini ekledi.`
        }

      case 'removeLabel':
        return {
          icon: <AssignmentInd />,
          label: `${name} ${labels
            .map(({ text }) => text)
            .join(', ')} etiketlerini çıkardı.`
        }

      case 'comment':
        return {
          icon: <Comment />,
          label: `${name} yorum yaptı.`
        }

      default:
        return {
          icon: null,
          label: ''
        }
    }
  }

  onClickNotification = issueId => {
    this.props
      .fetchIssueById(issueId)
      .then(this.props.history.push(`/issues/${issueId}`))
      .catch(() => console.log('Error'))
  }

  onClick = anchorEl => {
    this.setState({ open: !this.state.open, anchorEl })
    this.props.markNotificationsRead(
      _.map(this.props.notifications, ({ _id }) => _id)
    )
  }

  renderNotification = notification => {
    const { icon, label } = this.getNotificationIconAndLabel(notification)

    if (!icon || !label) return null

    return (
      <MenuItem
        onClick={() => this.onClickNotification(notification.data.issueId)}
      >
        {icon}
        <ListItemText
          primary={label}
          secondary={notification.date && notification.date.toString()}
          primaryTypographyProps={{ variant: 'body1' }}
          secondaryTypographyProps={{ variant: 'caption' }}
        />
      </MenuItem>
    )
  }

  render() {
    if (!this.props.notifications) return null

    const unreadNotifications = _.filter(
      this.props.notifications,
      ({ read }) => !read
    )

    return (
      <div>
        <IconButton
          aria-owns={this.state.open ? 'notification-menu' : null}
          aria-haspopup="true"
          onClick={({ currentTarget }) => this.onClick(currentTarget)}
          color="inherit"
        >
          <Badge badgeContent={unreadNotifications.length} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>

        <Menu
          id="notification-menu"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          {_.map(this.props.notifications, notification =>
            this.renderNotification(notification)
          )}
        </Menu>
      </div>
    )
  }
}

function mapStateToProps({ notifications }) {
  return {
    notifications
  }
}

export default connect(
  mapStateToProps,
  { fetchNotifications, markNotificationsRead, fetchIssueById }
)(withRouter(NotificationButton))
