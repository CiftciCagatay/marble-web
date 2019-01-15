import React from 'react'
import { connect } from 'react-redux'

import { Grid, Snackbar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import AssignedIssueList from '../components/home/assigned-issues-list/assigned-issues-list'
import HighPriorityIssuesCard from '../components/home/cards/high-priority-issues-card'
import CriticIssuesCard from '../components/home/cards/critic-issues-card'
import SolvedIssuesCard from '../components/home/cards/solved-issues-card'
import WaitingIssuesCard from '../components/home/cards/waiting-issues-card'
import NewIssueFabButton from '../components/issues/new-issue/new-issue-fab-button'
import EventsCard from '../components/home/events/event-list-card'
import IssuesByUsers from '../components/dashboard/issuesByUsers'

import AccessControl from '../components/common/access-control'
import { READ_ALL_TASKS } from '../config'

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
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.section}>
          <Grid container alignContent="space-between" spacing={16}>
            <Grid item xs>
              <CriticIssuesCard />
            </Grid>
            <Grid item xs>
              <HighPriorityIssuesCard />
            </Grid>
            <Grid item xs>
              <WaitingIssuesCard />
            </Grid>
            <Grid item xs>
              <SolvedIssuesCard />
            </Grid>
          </Grid>
        </div>

        <div className={classes.section}>
          <Grid container spacing={16}>
            <AccessControl permission={READ_ALL_TASKS}>
              <Grid xs={12} item>
                <IssuesByUsers />
              </Grid>
            </AccessControl>

            <Grid container item spacing={16}>
              <Grid xs={6} item>
                <AssignedIssueList />
              </Grid>

              <Grid xs={6} item>
                <EventsCard />
              </Grid>
            </Grid>
          </Grid>
        </div>

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

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
  },
  section: {
    paddingTop: theme.spacing.unit * 2
  }
})

export default connect(mapStateToProps)(withStyles(styles)(Home))
