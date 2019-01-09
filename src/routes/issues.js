import React, { Component } from 'react'
import IssueList from '../components/issues/issue-list'
import NewIssueFabButton from '../components/issues/new-issue/new-issue-fab-button'

class Issues extends Component {
  render() {
    return (
      <div>
        <IssueList
          isOpen={true}
          onSearchbarTextChange={this.onSearchbarTextChange}
        />
        <NewIssueFabButton />
      </div>
    )
  }
}

export default Issues
