import React, { Component } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { Done, Refresh } from '@material-ui/icons'
import { connect } from 'react-redux'
import { putIssueStatus, postIssueEvent } from '../../../../../actions'

class EditButton extends Component {
  onClick = () => {
    Promise.all([
      this.props.putIssueStatus(this.props.issueId, !this.props.isOpen),
      this.props.postIssueEvent({
        type: this.props.isOpen ? 'resolve' : 'reopen',
        unitId: this.props.unitId,
        issueId: this.props.issueId
      })
    ])
  }
  render() {
    return (
      <Tooltip
        key="edit-issue-button"
        title={this.props.isOpen ? 'Tamamlandı Olarak İşaretle' : 'Yeniden Aç'}
      >
        <IconButton onClick={this.onClick}>
          {this.props.isOpen ? <Done /> : <Refresh />}
        </IconButton>
      </Tooltip>
    )
  }
}

function mapStateToProps({ users: { user } }) {
  return { user }
}

export default connect(
  mapStateToProps,
  { putIssueStatus, postIssueEvent }
)(EditButton)
