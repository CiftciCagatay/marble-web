import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import IssueDialog from './issue-dialog'

class NewIssueFabButton extends Component {
  state = { open: false }

  handleModalClose = () => this.setState({ open: false })

  render() {
    return [
      <Button
        key="new-issue-fab-button"
        variant="fab"
        color="secondary"
        aria-label="Add"
        style={{ position: 'absolute', bottom: 20, right: 20 }}
        onClick={() => this.setState({ open: true })}
      >
        <Add />
      </Button>,

      <IssueDialog open={this.state.open} handleClose={this.handleModalClose} />
    ]
  }
}

export default NewIssueFabButton
