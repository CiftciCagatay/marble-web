import React, { Component } from 'react'
import {
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { DeleteForever as DeleteIcon } from '@material-ui/icons'
import { connect } from 'react-redux'
import { removeIssue } from '../../../../../actions'
import { withRouter } from 'react-router-dom'
import DeleteForeverDialog from '../../../../common/delete-forever-dialog'

class DeleteButton extends Component {
  state = {
    dialogOpen: false
  }

  onRemoveIssue = () => {
    this.props
      .removeIssue(this.props.issueId)
      .then(() => this.props.history.goBack())
  }

  render() {
    return [
      <Tooltip key="delete-issue-button" title="Görevi Sil">
        <IconButton onClick={() => this.setState({ dialogOpen: true })}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>,
      
      <DeleteForeverDialog
        open={this.state.dialogOpen}
        key="delete-dialog"
        title="Görevi Sil"
        detail="Görevi silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        onClickCancel={() => this.setState({ dialogOpen: false })}
        onClickDelete={this.onRemoveIssue}
      />
    ]
  }
}

export default connect(
  null,
  { removeIssue }
)(withRouter(DeleteButton))
