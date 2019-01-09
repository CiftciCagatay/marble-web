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

class Home extends React.Component {
  state = { open: false }

  componentDidMount() {
    const open = localStorage.getItem('showWelcomeMessage')
    this.setState({ open: open === 'true' }, () =>
      localStorage.removeItem('showWelcomeMessage')
    )
    console.log(process.env.REACT_APP_PORT)
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
        <Grid container spacing={8}>
          <Grid container item xs={12} sm={5} spacing={8}>
            <Grid item xs={6}>
              <CriticIssuesCard />
            </Grid>

            <Grid item xs={6}>
              <HighPriorityIssuesCard />
            </Grid>

            <Grid item xs={6}>
              <WaitingIssuesCard />
            </Grid>

            <Grid item xs={6}>
              <SolvedIssuesCard />
            </Grid>

            <Grid item xs={12}>
              <AssignedIssueList />
            </Grid>

            <Grid item xs={12}>
              <EventsCard />
            </Grid>
          </Grid>

          <Grid xs={12} sm={7} item>
            <IssuesByUsers />
          </Grid>
        </Grid>
        <NewIssueFabButton />

        {this.renderSnackbar()}
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
