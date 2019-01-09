import React, { Component } from 'react'
import IssueList from '../components/issues/issue-list'
import NewIssueFabButton from '../components/issues/new-issue/new-issue-fab-button'

class KnowledgeBase extends Component {
  render() {
    return (
      <div>
        <IssueList isOpen={false} />
        <NewIssueFabButton />
      </div>
    )
  }
}

export default KnowledgeBase
