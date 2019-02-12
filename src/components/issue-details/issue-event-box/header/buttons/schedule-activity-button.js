import React, { Component } from 'react'

import { IconButton, Tooltip } from '@material-ui/core'
import { Schedule as ScheduleIcon } from '@material-ui/icons'

import ActivityFormDialog from '../../../../activity/activity-form-dialog'

import _ from 'lodash'

class ScheduleActivityButton extends Component {
  state = {
    dialogOpen: false
  }

  render() {
    return [
      <Tooltip key="button" title="Etkinlik oluştur">
        <IconButton onClick={() => this.setState({ dialogOpen: true })}>
          <ScheduleIcon />
        </IconButton>
      </Tooltip>,

      <ActivityFormDialog
        open={this.state.dialogOpen}
        onClose={() => this.setState({ dialogOpen: false })}
        mode="create"
      />
    ]
  }
}

export default ScheduleActivityButton
