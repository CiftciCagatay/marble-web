import React, { Component } from 'react'
import { Paper, InputBase, IconButton, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Send as SendIcon, AttachFile } from '@material-ui/icons'
import { connect } from 'react-redux'
import { postIssueEvent } from '../../../../actions'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
}

class Footer extends Component {
  state = {
    comment: ''
  }

  sendComment = () => {
    const { comment } = this.state

    this.props
      .postIssueEvent({
        type: 'comment',
        comment,
        issueId: this.props.issueId,
        unitId: this.props.unitId
      })
      .then(() => this.setState({ comment: '' }))
      .catch(error => console.log(error))
  }

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root} elevation={0}>
        <InputBase
          value={this.state.comment}
          onChange={event => this.setState({ comment: event.target.value })}
          multiline
          fullWidth
          onKeyPress={e => {
            const { key, shiftKey } = e

            if (key === 'Enter' && !shiftKey) {
              this.sendComment()
            }
          }}
          className={classes.input}
          placeholder="Bir mesaj yazın"
        />

        <IconButton
          className={classes.iconButton}
          onClick={this.props.openFileDialog}
          aria-label="Attach File"
        >
          <AttachFile />
        </IconButton>

        <Divider className={classes.divider} />

        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="Directions"
          onClick={this.sendComment}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    )
  }
  /*
  render() {
    return (
      <div
        style={{
          backgroundColor: '#f2f2f2',
          padding: '5px',
          display: 'flex'
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: '2px',
            backgroundColor: '#fff',
            paddingLeft: '12px',
            paddingRight: '12px'
          }}
        >
          <Input
            value={this.state.comment}
            onChange={event => this.setState({ comment: event.target.value })}
            placeholder="Yorum yazın"
            fullWidth
            multiline
            rowsMax="5"
            onKeyPress={e => {
              const { key, shiftKey } = e

              if (key === 'Enter' && !shiftKey) {
                this.sendComment()
              }
            }}
          />
        </div>

        <div>
          <Button onClick={this.sendComment}>
            <Send />
          </Button>
        </div>
      </div>
    )
  }*/
}

export default connect(
  null,
  { postIssueEvent }
)(withStyles(styles)(Footer))
