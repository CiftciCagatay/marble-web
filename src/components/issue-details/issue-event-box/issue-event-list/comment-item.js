import React, { Component } from 'react'

import {
  Typography,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Paper
} from '@material-ui/core'

import {
  CloudDownload as DownloadIcon,
  InsertDriveFile,
  KeyboardArrowDown
} from '@material-ui/icons'

import { withStyles } from '@material-ui/core/styles'
import ColorHash from 'color-hash'
import './comment.css'

import DeleteForeverDialog from '../../../common/delete-forever-dialog'

import {
  issueEventFileUploaded,
  postIssueEvent,
  deleteIssueEvent
} from '../../../../actions'
import { getIssueEventById } from '../../../../api'
import { connect } from 'react-redux'

import { BPM_PORT, uploadImage } from '../../../../api'
import { DELETE_COMMENT } from '../../../../config'
import { timeDiff } from '../../../../scripts'

const styles = theme => ({
  quote: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit,
    backgroundColor: '#f5f5f5'
  },
  menuItem: {}
})

class CommentItem extends Component {
  csl = new ColorHash()

  state = {
    progress: 100,
    showCommentMenu: false,
    anchorEl: null,
    quote: null,
    dialogOpen: false
  }

  componentDidMount() {
    const { event } = this.props

    if (event.quoteId) {
      getIssueEventById(this.props.accessToken, event.quoteId)
        .then(response => response.json())
        .then(({ result }) => this.setState({ quote: result }))
    }

    if (event._id) {
      // Event backend den geliyor
    } else if (event.tempId && event.fileToUpload) {
      // Event henüz backend e gönderilmemiş
      this.uploadFile(event.fileToUpload)
        .then(response => response.json())
        .then(files => {
          this.setState({ progress: 100 })
          this.props.issueEventFileUploaded(event.tempId, files[0])
          return Promise.resolve(files[0])
        })
        .then(file =>
          this.props.postIssueEvent({ ...event, file, fileToUpload: undefined })
        )
        .catch(err => console.log(err))
    }
  }

  onClickFile = () => {
    const { file } = this.props.event

    if (file.mimetype.startsWith('image/')) {
      // Show bigger image
    }

    const link = document.createElement('a', { target: '_blank' })
    link.href = `http://arctory.tk:${BPM_PORT}${file.path}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  uploadFile = file => {
    const formData = new FormData()

    formData.append('uploads', file)

    return uploadImage(this.props.accessToken, formData, progress =>
      this.setState({ progress })
    )
  }

  renderImage = image => {
    return (
      <a
        href={`http://arctory.tk:${BPM_PORT}${image.path}`}
        target="_blank"
        style={{
          textDecoration: 'none'
        }}
      >
        <img
          style={{
            height: '100px',
            width: '150px',
            cursor: 'pointer',
            borderRadius: '2px',
            objectFit: 'cover'
          }}
          src={`http://arctory.tk:${BPM_PORT}${image.path}`}
        />
      </a>
    )
  }

  renderFile = file => {
    let fileName = ''

    if (file.originalname) {
      fileName = file.originalname
    } else if (file.name) {
      fileName = file.name
    }
    return (
      <div
        style={{
          display: 'flex',
          padding: '8px',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: '2px',
          backgroundColor: 'rgba(246, 246, 246, 0.5)'
        }}
      >
        <div>
          <InsertDriveFile />
        </div>

        <div style={{ fontSize: '14px' }}>
          {fileName.substring(0, 20)}
          {fileName.length > 20 && '...'}
        </div>

        <div>
          {this.state.progress !== 100 ? (
            <CircularProgress
              style={{ margin: '4px' }}
              value={this.state.progress * 100}
            />
          ) : (
            <a
              href={`http://arctory.tk:${BPM_PORT}${file.path}`}
              target="_blank"
            >
              <IconButton>
                <DownloadIcon style={{ color: '#757575' }} />
              </IconButton>
            </a>
          )}
        </div>
      </div>
    )
  }

  renderMedia = file => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      return this.renderImage(file)
    } else {
      return this.renderFile(file)
    }
  }

  onRemoveCommentButtonClick = () => {
    this.props.deleteIssueEvent(this.props.event._id)

    this.setState({ anchorEl: null, dialogOpen: false })
  }

  renderMenu = () => {
    const { classes, event, user, onClickQuote } = this.props

    const menuItems = [
      {
        label: 'Cevapla',
        onClick: () => {
          this.setState({ anchorEl: null })
          onClickQuote(event)
        }
      },
      {
        label: 'Mesajı sil',
        onClick: () => this.setState({ dialogOpen: true }),
        hide:
          !user.permissions.includes(DELETE_COMMENT) &&
          event.author._id !== user._id
      }
    ]

    return (
      <div
        className="carrot"
        style={{ opacity: this.state.showCommentMenu ? 1 : 0 }}
      >
        <span
          aria-owns={this.state.anchorEl ? 'comment-menu' : undefined}
          aria-haspopup="true"
          onClick={e => this.setState({ anchorEl: e.currentTarget })}
        >
          <KeyboardArrowDown />
        </span>

        <Menu
          id="comment-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={() => this.setState({ anchorEl: null })}
        >
          {menuItems.map((item, i) => {
            if (item.hide) return null

            return (
              <MenuItem
                key={i}
                onClick={item.onClick}
                className={classes.menuItem}
              >
                <Typography variant="body1">{item.label}</Typography>
              </MenuItem>
            )
          })}
        </Menu>
      </div>
    )
  }

  renderQuote = () => {
    const { classes } = this.props
    const { quote } = this.state
    const color = this.csl.hex(quote.author._id)

    return (
      <div
        className={classes.quote}
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <Typography style={{ color, fontSize: 13 }}>
          {quote.author.name}
        </Typography>
        <Typography>{quote.comment}</Typography>
      </div>
    )
  }

  render() {
    const { ownEvent, event } = this.props

    return [
      <div style={{ marginBottom: '8px' }} key={event._id}>
        <div
          style={{
            maxWidth: '60%',
            float: ownEvent ? 'right' : 'left'
          }}
        >
          <Paper
            className={`bubble ${ownEvent ? 'bubble-right' : 'bubble-left'}`}
            onMouseEnter={() => this.setState({ showCommentMenu: true })}
            onMouseLeave={() => this.setState({ showCommentMenu: false })}
          >
            {this.renderMenu()}

            <div
              style={{
                color: this.csl.hex(event.author._id),
                fontSize: 13
              }}
            >
              {!ownEvent && `${event.author.name}`}
            </div>

            <div
              style={{
                textAlign: 'center'
              }}
            >
              {event.fileToUpload && this.renderFile(event.fileToUpload)}

              {event.file && this.renderMedia(event.file)}
            </div>

            {this.state.quote && this.renderQuote()}

            <Typography>{event.comment}</Typography>

            <Typography align="right" variant="caption">
              {timeDiff(event.date)}
            </Typography>
          </Paper>
        </div>
      </div>,

      <DeleteForeverDialog
        key="delete-dialog"
        open={this.state.dialogOpen}
        title="Mesajı Sil"
        detail="Mesajı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        onClickCancel={() => this.setState({ dialogOpen: false })}
        onClickDelete={this.onRemoveCommentButtonClick}
      />
    ]
  }
}

function mapStateToProps({ auth: { accessToken }, users: { user } }) {
  return { accessToken, user }
}

export default connect(
  mapStateToProps,
  { issueEventFileUploaded, postIssueEvent, deleteIssueEvent }
)(withStyles(styles)(CommentItem))
