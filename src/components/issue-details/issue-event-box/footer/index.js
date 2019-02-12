import React, { Component } from 'react'
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  Typography,
  Grid
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {
  Send as SendIcon,
  AttachFile,
  CancelOutlined as CancelIcon
} from '@material-ui/icons'
import { connect } from 'react-redux'
import { postIssueEvent } from '../../../../actions'
import ColorHash from 'color-hash'

const styles = theme => ({
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
  },
  quote: {
    padding: theme.spacing.unit,
    backgroundColor: '#f5f5f5'
  },
  quoteRoot: {
    padding: theme.spacing.unit
  }
})

class Footer extends Component {
  state = {
    comment: ''
  }
  csl = new ColorHash()

  sendComment = () => {
    const { quote } = this.props
    const { comment } = this.state

    this.props
      .postIssueEvent({
        type: 'comment',
        comment,
        issueId: this.props.issueId,
        unitId: this.props.unitId,
        quoteId: quote ? quote._id : null
      })
      .then(() => {
        this.props.onClickUnquote()
        this.setState({ comment: '' })
      })
      .catch(error => console.log(error))
  }

  renderQuote = () => {
    const { quote, classes } = this.props

    if (!quote) return null

    const color = this.csl.hex(quote.author._id)

    return (
      <div className={classes.quoteRoot} key="quote">
        <Grid
          container
          justify="space-between"
          alignItems="center"
          spacing={16}
        >
          <Grid xs item>
            <div
              className={classes.quote}
              style={{ borderLeft: `4px solid ${color}` }}
            >
              <Typography style={{ color, fontSize: 13 }}>
                {quote.author.name}
              </Typography>
              <Typography>
                {quote.comment ? quote.comment.substring(0, 140) : ''}...
              </Typography>
            </div>
          </Grid>

          <Grid item>
            <IconButton onClick={this.props.onClickUnquote}>
              <CancelIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return [
      this.renderQuote(),
      <Paper className={classes.root} key="input-paper" elevation={0}>
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
    ]
  }
}

export default connect(
  null,
  { postIssueEvent }
)(withStyles(styles)(Footer))
