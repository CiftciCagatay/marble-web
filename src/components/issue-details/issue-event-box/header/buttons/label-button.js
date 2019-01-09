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
  getLabelList,
  updateLabelsAction,
  postIssueEvent
} from '../../../../../actions'
import update from 'immutability-helper'

class LabelButton extends Component {
  state = {
    anchorEl: null,
    labels: []
  }

  componentDidMount() {
    this.setState({ labels: this.props.selectedLabels })
    
    this.props.getLabelList({ unit: this.props.unit })
  }

  // Actions
  updateLabels = () => {
    if (this.props.updateLabels) {
      return this.props.updateLabels(this.state.labels).then(Promise.reject())
    }

    return this.props.updateLabelsAction(this.props.issueId, this.state.labels)
  }

  addEvents = (addedLabels, removedLabels) => {
    let promises = []

    if (addedLabels.length > 0)
      promises.push(
        this.props.postIssueEvent({
          issueId: this.props.issueId,
          type: 'addLabel',
          labels: addedLabels
        })
      )

    if (removedLabels.length > 0)
      promises.push(
        this.props.postIssueEvent({
          issueId: this.props.issueId,
          type: 'removeLabel',
          labels: removedLabels
        })
      )

    return Promise.all(promises)
  }

  // Compare Functions
  getAddedLabels = () =>
    this.state.labels.filter(
      label => !this.props.selectedLabels.includes(label)
    )

  getRemovedLabels = () =>
    this.props.selectedLabels.filter(
      label => !this.state.labels.includes(label)
    )

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
      .then(() => this.addEvents(addedLabels, removedLabels))
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
          {this.props.labels.map(label => {
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
  { getLabelList, postIssueEvent, updateLabelsAction }
)(LabelButton)
