import React, { Component, createRef } from 'react'
import { Card } from '@material-ui/core'

import FileDropzone from '../../common/fileDropzone'

import IssueEventList from './issue-event-list'
import Header from './header'
import Footer from './footer'
import Overlay from './overlay'

import './index.css'

class IssueEventBox extends Component {
  state = {
    fileHovering: false,
    attachButtonClicked: false,
    quote: null
  }

  constructor(props) {
    super(props)
  }

  setDropzoneRef = node => (this.dropzoneRef = node)

  openFileDialog = () => {
    this.setState({ attachButtonClicked: true, fileHovering: true }, () =>
      this.setState({ attachButtonClicked: false })
    )
  }

  render() {
    return (
      <FileDropzone
        onDragEnter={() => this.setState({ fileHovering: true })}
        onDragLeave={() => this.setState({ fileHovering: false })}
        setDropzoneRef={this.setDropzoneRef}
        disableClick
      >
        <div class="container">
          <div class="event-box">
            <Card>
              <Header issue={this.props.issue} />

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'auto',
                  height: '60vh',
                  padding: '12px 30px 0px 30px',
                  backgroundColor: '#ECEFF1'
                }}
              >
                <IssueEventList
                  issueId={this.props.issue._id}
                  onClickQuote={quote => this.setState({ quote })}
                />
              </div>
              <Footer
                issueId={this.props.issue._id}
                unitId={this.props.issue.unit._id}
                quote={this.state.quote}
                openFileDialog={this.openFileDialog}
                onClickUnquote={() => this.setState({ quote: null })}
              />
            </Card>
          </div>

          <div
            class="overlay"
            style={{
              height: this.state.fileHovering ? '100%' : 0,
              top: this.state.fileHovering ? 0 : '100%'
            }}
          >
            <Overlay
              isOpen={this.state.attachButtonClicked}
              issueId={this.props.issue._id}
              unitId={this.props.issue.unit._id}
              closeOverlay={() => this.setState({ fileHovering: false })}
            />
          </div>
        </div>
      </FileDropzone>
    )
  }
}

export default IssueEventBox
