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

import {
  getUserList,
  updateAssigneesAction,
  postIssueEvent
} from '../../../../../actions'
import { connect } from 'react-redux'
import update from 'immutability-helper'

class AssigneeButton extends Component {
  state = {
    anchorEl: null,
    assignees: []
  }

  componentDidMount() {
    this.setState({ assignees: this.props.assignees })

    this.props.getUserList({ unit: this.props.unit })
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

  addEvents = (addedAssignees, removedAssignees) => {
    let promises = []

    if (addedAssignees.length > 0)
      promises.push(
        this.props.postIssueEvent({
          issueId: this.props.issueId,
          unitId: this.props.unitId,
          type: 'assign',
          users: addedAssignees
        })
      )

    if (removedAssignees.length > 0)
      promises.push(
        this.props.postIssueEvent({
          issueId: this.props.issueId,
          unitId: this.props.unitId,
          type: 'unassign',
          users: removedAssignees
        })
      )

    return Promise.all(promises)
  }

  getAddedAssignees = () =>
    this.state.assignees.filter(
      assignee => !this.props.assignees.includes(assignee)
    )

  getRemovedAssignees = () =>
    this.props.assignees.filter(
      assignee => !this.state.assignees.includes(assignee)
    )

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
      .then(() => this.addEvents(addedAssignees, removedAssignees))
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
          {this.props.users.map(user => {
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

function mapStateToProps({ users: { users } }) {
  return {
    users
  }
}

export default connect(
  mapStateToProps,
  { getUserList, updateAssigneesAction, postIssueEvent }
)(AssigneeButton)
