import React, { Component } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

class EditButton extends Component {
  state = {
    open: false
  }

  render() {
    const { open } = this.state

    return [
      <Tooltip key="edit-issue-button" title="Görevi Düzenle">
        <IconButton onClick={() => this.setState({ open: true })}>
          <Edit />
        </IconButton>
      </Tooltip>
    ]
  }
}

export default EditButton
