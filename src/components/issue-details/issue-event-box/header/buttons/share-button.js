import React, { Component } from 'react'

import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'

import { WhatsappShareButton, WhatsappIcon } from 'react-share'

class ShareButton extends Component {
  state = { open: false }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }))
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    const { open } = this.state

    return (
      <SpeedDial
        ariaLabel="SpeedDial example"
        icon={<SpeedDialIcon />}
        style={{ position: 'absolute', top: 8, right: 8 }}
        onBlur={this.handleClose}
        onClick={this.handleClick}
        onClose={this.handleClose}
        onFocus={this.handleOpen}
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
        open={open}
        direction="down"
      >
        <SpeedDialAction
          key={'wp'}
          icon={
            <WhatsappShareButton
              title="Sorun"
              url="http://google.com"
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          }
          tooltipTitle={'Whatsapp'}
        />
      </SpeedDial>
    )
  }
}

export default ShareButton
