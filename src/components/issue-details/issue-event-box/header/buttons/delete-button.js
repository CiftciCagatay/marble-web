import React, { Component } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'
import { connect } from 'react-redux'
import { removeIssue } from '../../../../../actions'
import { withRouter } from 'react-router-dom'

class DeleteButton extends Component {
  onClick = () => {
    this.props
      .removeIssue(this.props.issueId)
      .then(() => this.props.history.goBack())
  }

  render() {
    return (
      <Tooltip key="delete-issue-button" title="Görevi Sil">
        <IconButton onClick={this.onClick}>
          <DeleteForever />
        </IconButton>
      </Tooltip>
    )
  }
}

export default connect(
  null,
  { removeIssue }
)(withRouter(DeleteButton))
