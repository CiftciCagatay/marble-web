import React, { Component } from 'react'
import ColorHash from 'color-hash'
import './comment.css'
import {
  Typography,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core'
import {
  CloudDownload as DownloadIcon,
  InsertDriveFile,
  KeyboardArrowDown
} from '@material-ui/icons'
import { ROOT_URL, BPM_PORT, uploadImage } from '../../../../api'
import { connect } from 'react-redux'
import {
  issueEventFileUploaded,
  postIssueEvent,
  deleteIssueEvent
} from '../../../../actions'

import { timeDiff } from '../../../../scripts'

class CommentItem extends Component {
  csl = new ColorHash()

  state = {
    progress: 100,
    showCommentMenu: false,
    anchorEl: null
  }

  componentDidMount() {
    const { event } = this.props

    if (event._id) {
      // Event backend den geliyor
    } else if (event.tempId && event.fileToUpload) {
      // Event henüz backend e gönderilmemiş
      this.uploadFile(event.fileToUpload)
        .then(result => {
          let files = JSON.parse(result)
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
    link.href = `${ROOT_URL}:${BPM_PORT}${file.path}`
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
        href={`${ROOT_URL}:${BPM_PORT}${image.path}`}
        target="_blank"
        style={{ textDecoration: 'none' }}
      >
        <img
          style={{ maxHeight: '120px', maxWidth: '100%', cursor: 'pointer' }}
          src={`${ROOT_URL}:${BPM_PORT}${image.path}`}
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
              variant="determinate"
              value={this.state.progress * 100}
            />
          ) : (
            <a href={`${ROOT_URL}:${BPM_PORT}${file.path}`} target="_blank">
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
    if (file.mimetype.startsWith('image/')) {
      return this.renderImage(file)
    } else {
      return this.renderFile(file)
    }
  }

  onRemoveCommentButtonClick = () => {
    this.props.deleteIssueEvent(this.props.event._id)

    this.setState({ anchorEl: null })
  }

  renderMenu = () => {
    return (
      <div
        class="carrot"
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
          <MenuItem
            onClick={this.onRemoveCommentButtonClick}
            disableGutters={true}
          >
            <Typography variant="body1">Yorumu sil</Typography>
          </MenuItem>
        </Menu>
      </div>
    )
  }

  render() {
    const { ownEvent, event } = this.props

    return (
      <div style={{ marginBottom: '8px' }}>
        <div
          style={{
            maxWidth: '60%',
            float: ownEvent ? 'right' : 'left'
          }}
        >
          <div
            class={`bubble ${ownEvent ? 'bubble-right' : 'bubble-left'}`}
            onMouseEnter={() => this.setState({ showCommentMenu: true })}
            onMouseLeave={() => this.setState({ showCommentMenu: false })}
          >
            {this.renderMenu()}

            <div
              style={{
                color: this.csl.hex(event.author._id),
                fontWeight: 'bold',
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

            <Typography>{event.comment}</Typography>

            <div style={{ textAlign: 'right', color: 'grey', fontSize: 12 }}>
              {timeDiff(event.date)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth: { accessToken } }) {
  return { accessToken }
}

export default connect(
  mapStateToProps,
  { issueEventFileUploaded, postIssueEvent, deleteIssueEvent }
)(CommentItem)
