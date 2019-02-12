import React, { Component } from 'react'
import {
  IconButton,
  Tooltip,
  Popover,
  List,
  ListItemText,
  ListItem,
  Checkbox,
  ListItemSecondaryAction
} from '@material-ui/core'
import { AssignmentInd } from '@material-ui/icons'
import UserAvatar from '../../../../common/user-avatar'

import { updateAssigneesAction, postIssueEvent } from '../../../../../actions'
import { getUsers } from '../../../../../api'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import _ from 'lodash'

class AssigneeButton extends Component {
  state = {
    anchorEl: null,
    assignees: []
  }

  componentDidMount() {
    this.setState({ assignees: this.props.assignees })

    getUsers(this.props.accessToken, { unit: this.props.unit })
      .then(response => response.json())
      .then(({ results }) => {
        this.setState({ users: _.mapKeys(results, '_id') })
      })
  }

  // Actions
  updateAssignees = () => {
    if (this.props.updateAssignees) {
      return this.props
        .updateAssignees(this.state.assignees)
        .then(Promise.reject())
    }

    return this.props.updateAssigneesAction(
      this.props.issueId,
      this.state.assignees
    )
  }

  getAddedAssignees = () => {
    const ids = this.props.assignees.map(({ _id }) => _id)

    return this.state.assignees.filter(({ _id }) => ids.indexOf(_id) === -1)
  }

  getRemovedAssignees = () => {
    const ids = this.state.assignees.map(({ _id }) => _id)

    return this.props.assignees.filter(({ _id }) => ids.indexOf(_id) === -1)
  }

  handleClick = event => this.setState({ anchorEl: event.currentTarget })

  handlePopoverClose = () => {
    // Find added and removed assignees by comparing state and given props
    const addedAssignees = this.getAddedAssignees()
    const removedAssignees = this.getRemovedAssignees()

    // If no changes made on assignees dont take action
    if (addedAssignees.length === 0 && removedAssignees.length === 0) {
      this.setState({ anchorEl: null })
      return
    }

    // If there are changes begin updating process
    this.setState({ updating: true })

    this.updateAssignees()
      .then(() => this.setState({ updating: false, anchorEl: null }))
      .catch(() => this.setState({ updating: false, anchorEl: null }))
  }

  handleClickOnUser({ user, checked }, event) {
    if (checked) {
      // Remove assignee from list
      const indexToRemove = this.state.assignees
        .map(({ _id }) => _id)
        .indexOf(user._id)

      const updatedAssignees = update(this.state.assignees, {
        $splice: [[indexToRemove, 1]]
      })

      this.setState({ assignees: updatedAssignees })
    } else {
      // Add assignee to list
      const updatedAssignees = update(this.state.assignees, {
        $push: [user]
      })

      this.setState({ assignees: updatedAssignees })
    }
  }

  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return [
      <Tooltip key="assignee-button" title="Görevlileri Düzenle">
        <IconButton
          aria-owns={open ? 'assignee-popover' : null}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
          <AssignmentInd />
        </IconButton>
      </Tooltip>,

      <Popover
        key="assignee-popover"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        id="assignee-popover"
        anchorEl={anchorEl}
        onClose={this.handlePopoverClose}
      >
        <List dense>
          {_.map(this.state.users, user => {
            const checked = this.state.assignees.some(
              ({ _id }) => _id === user._id
            )

            return (
              <ListItem
                key={user._id}
                onClick={this.handleClickOnUser.bind(this, { user, checked })}
                button
              >
                <UserAvatar user={user} />
                <ListItemText primary={user.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    tabIndex={-1}
                    checked={checked}
                    disableRipple
                    onClick={this.handleClickOnUser.bind(this, {
                      user,
                      checked
                    })}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </Popover>
    ]
  }
}

function mapStateToProps({ auth: { accessToken } }) {
  return {
    accessToken
  }
}

export default connect(
  mapStateToProps,
  { updateAssigneesAction, postIssueEvent }
)(AssigneeButton)
