import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Modal } from '@material-ui/core'
import EditIssueForm from './edit-issue-form'

const EditIssueModal = props => {
  const { open, handleModalClose, classes } = props

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onEscapeKeyDown={handleModalClose}
    >
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          maxHeight: '80%',
          overflow: 'scroll'
        }}
        className={classes.paper}
      >
        <EditIssueForm closeModal={handleModalClose} />
      </div>
    </Modal>
  )
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

EditIssueModal.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditIssueModal)
