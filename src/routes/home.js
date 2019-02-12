import React from 'react'
import { connect } from 'react-redux'

import { Grid, Snackbar } from '@material-ui/core'

import AssignedIssueList from '../components/home/assigned-issues-list/assigned-issues-list'
import HighPriorityIssuesCard from '../components/home/cards/high-priority-issues-card'
import CriticIssuesCard from '../components/home/cards/critic-issues-card'
import SolvedIssuesCard from '../components/home/cards/solved-issues-card'
import WaitingIssuesCard from '../components/home/cards/waiting-issues-card'
import NewIssueFabButton from '../components/issues/new-issue/new-issue-fab-button'
import EventsCard from '../components/home/events/event-list-card'
import IssuesByUsers from '../components/dashboard/issuesByUsers'

import UpdateNotesDialog from '../components/common/update-notes'

class Home extends React.Component {
  state = { open: false }

  componentDidMount() {
    const open = localStorage.getItem('showWelcomeMessage')
    this.setState({ open: open === 'true' }, () =>
      localStorage.removeItem('showWelcomeMessage')
    )
  }

  renderSnackbar = () => {
    let message = 'Hoşgeldiniz!'

    if (this.props.user) {
      let hours = new Date().getHours()

      if (hours > 8 && hours < 12) {
        message = 'Günaydın ' + this.props.user.name
      } else if (hours > 12 && hours < 18) {
        message = 'İyi günler ' + this.props.user.name
      } else if (hours > 18 && hours <= 23) {
        message = 'İyi akşamlar ' + this.props.user.name
      } else {
        message = 'İyi geceler ' + this.props.user.name
      }
    }

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={this.state.open}
        onClose={() => this.setState({ open: false })}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{message}</span>}
      />
    )
  }

  render() {
    return (
      <div>
        <div>
          <Grid container alignContent="space-between" spacing={16}>
            <Grid item xs={12} sm={6} md={3}>
              <CriticIssuesCard />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <HighPriorityIssuesCard />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <WaitingIssuesCard />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SolvedIssuesCard />
            </Grid>
          </Grid>
        </div>

        <div>
          <Grid container spacing={16}>
            <Grid xs={12} item>
              <IssuesByUsers />
            </Grid>

            <Grid container item spacing={16}>
              <Grid sm={12} md={6} item>
                <AssignedIssueList />
              </Grid>

              <Grid sm={12} md={6} item>
                <EventsCard />
              </Grid>
            </Grid>
          </Grid>
        </div>

        <NewIssueFabButton />

        {this.renderSnackbar()}

        <UpdateNotesDialog />
      </div>
    )
  }
}

function mapStateToProps({ users: { user } }) {
  return {
    user
  }
}

export default connect(mapStateToProps)(Home)
