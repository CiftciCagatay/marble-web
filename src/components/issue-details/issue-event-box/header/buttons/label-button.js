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
import { Label } from '@material-ui/icons'

import { connect } from 'react-redux'
import {
  fetchLabels,
  updateLabelsAction,
  postIssueEvent
} from '../../../../../actions'
import update from 'immutability-helper'
import _ from 'lodash'

class LabelButton extends Component {
  state = {
    anchorEl: null,
    labels: []
  }

  componentDidMount() {
    this.setState({ labels: this.props.selectedLabels })

    this.props.fetchLabels({ unit: this.props.unit })
  }

  // Actions
  updateLabels = () => {
    if (this.props.updateLabels) {
      return this.props.updateLabels(this.state.labels).then(Promise.reject())
    }

    return this.props.updateLabelsAction(this.props.issueId, this.state.labels)
  }

  // Compare Functions
  getAddedLabels = () => {
    const ids = this.props.selectedLabels.map(({ _id }) => _id)
    return this.state.labels.filter(({ _id }) => ids.indexOf(_id) === -1)
  }

  getRemovedLabels = () => {
    const ids = this.state.labels.map(({ _id }) => _id)
    return this.props.selectedLabels.filter(
      ({ _id }) => ids.indexOf(_id) === -1
    )
  }

  // Handlers
  handlePopoverButtonClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handlePopoverClose = () => {
    // Find added and removed labels by comparing state and given props
    const addedLabels = this.getAddedLabels()
    const removedLabels = this.getRemovedLabels()

    // If no changes made on assignees dont take action
    if (addedLabels.length === 0 && removedLabels.length === 0) {
      this.setState({ anchorEl: null })
      return
    }

    // If there are changes begin updating process
    this.setState({ updating: true })

    this.updateLabels()
      .then(() => this.setState({ updating: false, anchorEl: null }))
      .catch(() => this.setState({ updating: false, anchorEl: null }))
  }

  handleClickOnLabel({ label, checked }, event) {
    if (checked) {
      // Remove label from list
      const indexToRemove = this.state.labels
        .map(({ _id }) => _id)
        .indexOf(label._id)

      const updatedLabels = update(this.state.labels, {
        $splice: [[indexToRemove, 1]]
      })

      this.setState({ labels: updatedLabels })
    } else {
      // Add label to list
      const updatedLabels = update(this.state.labels, {
        $push: [label]
      })

      this.setState({ labels: updatedLabels })
    }
  }

  render() {
    if (!this.props.selectedLabels) return null

    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return [
      <Tooltip key="label-button" title="Etiketleri Düzenle">
        <IconButton
          aria-owns={open ? 'label-popover' : null}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handlePopoverButtonClick}
        >
          <Label />
        </IconButton>
      </Tooltip>,

      <Popover
        key="label-popover"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        id="label-popover"
        anchorEl={anchorEl}
        onClose={this.handlePopoverClose}
      >
        <List dense>
          {_.map(this.props.labels, label => {
            const checked = this.state.labels.some(
              ({ _id }) => _id === label._id
            )

            return (
              <ListItem
                key={label._id}
                onClick={this.handleClickOnLabel.bind(this, { checked, label })}
                button
              >
                <ListItemText>{label.text}</ListItemText>
                <ListItemSecondaryAction>
                  <Checkbox
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                    onClick={this.handleClickOnLabel.bind(this, {
                      checked,
                      label
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

function mapStateToProps({ labels }) {
  return {
    labels
  }
}

export default connect(
  mapStateToProps,
  { fetchLabels, postIssueEvent, updateLabelsAction }
)(LabelButton)
