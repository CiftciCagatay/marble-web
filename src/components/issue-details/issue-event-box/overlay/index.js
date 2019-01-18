import React, { Component } from 'react'
import { Close, Add, InsertDriveFile as FileIcon } from '@material-ui/icons'
import { Input, Button, Typography } from '@material-ui/core'
import FileDropzone from '../../../common/fileDropzone'

import { connect } from 'react-redux'
import { addIssueEventsToUpload } from '../../../../actions'
import './index.css'
import _ from 'lodash'
import EventGrid from './eventGrid'

class Overlay extends Component {
  state = {
    events: {},
    selectedEventId: ''
  }

  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    const { isOpen } = this.props
    const { isOpen: wasOpen } = prevProps

    if (isOpen && !wasOpen) {
      this.openFileDialog()
    }
  }

  renderMedia = event => {
    if (!event || !event.fileToUpload) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e8e9ea',
            flex: 1
          }}
        >
          <Typography style={{ margintTop: '50px' }}>
            Dosyaları buraya bırakın...
          </Typography>
        </div>
      )
    }

    const file = event.fileToUpload

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e8e9ea',
          flex: 1
        }}
      >
        {file.type.startsWith('image/') ? (
          <img src={file.preview} style={{ maxHeight: '200px' }} />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <FileIcon />
            <div>{file.name}</div>
          </div>
        )}
      </div>
    )
  }

  onCommentChange = e => {
    const comment = e.target.value
    const { events, selectedEventId } = this.state

    this.setState({
      events: {
        ...events,
        [selectedEventId]: { ...events[selectedEventId], comment }
      }
    })
  }

  onFileDrop = (acceptedFiles, _) => {
    let temp = {}
    let selectedEventId = ''

    acceptedFiles.map((fileToUpload, index) => {
      const tempId = `temp-${new Date().getTime()}-${index}`

      selectedEventId = tempId

      temp[tempId] = {
        fileToUpload,
        tempId,
        comment: '',
        type: 'comment',
        author: this.props.user,
        issueId: this.props.issueId,
        unitId: this.props.unitId
      }
    })

    this.setState({
      events: { ...this.state.events, ...temp },
      selectedEventId
    })
  }

  setDropzoneRef = node => (this.dropzoneRef = node)

  openFileDialog = () => {
    if (this.dropzoneRef) this.dropzoneRef.open()
  }

  onSubmitEvents = () => {
    this.props.addIssueEventsToUpload(this.state.events)
    this.setState({ events: [], selectedEventId: 0 })
    this.props.closeOverlay()
  }

  onRemoveEvent = key => {
    const { [key]: _, ...events } = this.state.events
    let selectedEventId = this.state.selectedEventId

    if (this.state.selectedEventId === key) {
      selectedEventId = ''
    }

    this.setState({ events, selectedEventId })
  }

  render() {
    const { events, selectedEventId } = this.state
    const currentEvent = events[selectedEventId] || {}

    return (
      <FileDropzone
        onDrop={this.onFileDrop}
        setDropzoneRef={this.setDropzoneRef}
        disableClick
        style={{ height: '100%' }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <div class="header">
            <Close
              style={{ cursor: 'pointer' }}
              onClick={() => {
                this.setState({ events: [], selectedEventId: 0 })
                this.props.closeOverlay()
              }}
            />
            <span>Önizleme</span>
          </div>

          {this.renderMedia(currentEvent)}

          <div class="comment-container">
            <div style={{ width: '80%', display: 'inline-block' }}>
              <Input
                onChange={e => this.onCommentChange(e)}
                value={currentEvent.comment}
                placeholder="Yorum yazın..."
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '4px' }}
                onClick={() => this.onSubmitEvents()}
              >
                Gönder
              </Button>
            </div>
          </div>

          <EventGrid
            events={this.state.events}
            selectedEventId={this.state.selectedEventId}
            openFileDialog={this.openFileDialog}
            onSelectEvent={key =>
              this.setState({
                selectedEventId: key
              })
            }
            removeEvent={this.onRemoveEvent}
          />
        </div>
      </FileDropzone>
    )
  }
}

function mapStateToProps({ auth: { accessToken }, users: { user } }) {
  return { accessToken, user }
}

export default connect(
  mapStateToProps,
  { addIssueEventsToUpload }
)(Overlay)
