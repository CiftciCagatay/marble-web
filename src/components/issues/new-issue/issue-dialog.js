import React, { Component } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import IssueForm from './issue-form'

class IssueDialog extends Component {
  render() {
    const { open, handleClose } = this.props

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        disableBackdropClick
        aria-categoryledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Görev Oluştur</DialogTitle>

        <DialogContent>
          <IssueForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    )
  }
}

export default IssueDialog
