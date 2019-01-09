import React, { Component } from 'react'

import { fetchIssueEvents } from '../../../../actions'
import { connect } from 'react-redux'

import CommentItem from './comment-item'
import LabelItem from './label-item'
import AssignItem from './assign-item'
import { map } from 'lodash'

class IssueEventList extends Component {
  eventsEnd = null

  componentDidMount() {
    let limit = this.props.limit || -1
    this.props.fetchIssueEvents(this.props.issueId, limit).then(() => {
      // Scroll to bottom of event list
      this.scrollToBottom()
    })
  }

  scrollToBottom = () => this.eventsEnd.scrollIntoView({ behavior: 'smooth' })

  render() {
    let ownEvent = true

    return [
      ...map(this.props.issueEvents, event => {
        if (!event.author) return null

        ownEvent = this.props.user._id === event.author._id

        if (event.type === 'comment') {
          return <CommentItem ownEvent={ownEvent} event={event} />
        } else if (event.type === 'addLabel' || event.type === 'removeLabel') {
          return <LabelItem event={event} />
        } else if (event.type === 'assign' || event.type === 'unassign') {
          return <AssignItem event={event} />
        }

        return null
      }),

      <div
        ref={el => {
          this.eventsEnd = el
        }}
      />
    ]
  }
}

function mapStateToProps({ issueEvents, users: { user } }) {
  return {
    issueEvents,
    user
  }
}

export default connect(
  mapStateToProps,
  { fetchIssueEvents }
)(IssueEventList)
