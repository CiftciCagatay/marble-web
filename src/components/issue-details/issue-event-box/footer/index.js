import React, { Component } from 'react'
import { Input, Button } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import { connect } from 'react-redux'
import { postIssueEvent } from '../../../../actions'

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
  }
}

export default connect(
  null,
  { postIssueEvent }
)(Footer)
