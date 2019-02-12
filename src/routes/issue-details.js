import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchIssueById } from '../actions'

import { Grid } from '@material-ui/core'

import IssueDetailsCard from '../components/issue-details/issue-details-card'
import IssueEventBox from '../components/issue-details/issue-event-box'

class IssueDetails extends Component {
  state = {
    commentBoxOpen: false
  }

  componentDidMount() {
    const issueId = this.props.match.params.id
    
    const issue = this.props.issues[issueId]

    // Eğer sorun redux ta yoksa
    if (!issue) {
      this.props.fetchIssueById(issueId).catch(e => console.log(e))
    }
  }

  toggleCommentBox = () =>
    this.setState({ commentBoxOpen: !this.state.commentBoxOpen })

  render() {
    const issueId = this.props.match.params.id
    const issue = this.props.issues[issueId]

    if (!issue) return <div>Lütfen bekleyin...</div>

    return (
      <Grid spacing={8} container>
        <Grid xs={12} sm={4} item>
          <IssueDetailsCard issue={issue} />
        </Grid>

        <Grid xs={12} sm={8} item>
          <IssueEventBox issue={issue} />
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps({ issues }) {
  return { issues }
}

export default connect(
  mapStateToProps,
  { fetchIssueById }
)(IssueDetails)
