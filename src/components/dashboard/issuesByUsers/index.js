import React, { Component } from 'react'

import Chart from './chart'
import IssueList from './table'
import { Grid, Paper, ListSubheader } from '@material-ui/core'

import _ from 'lodash'
import { connect } from 'react-redux'
import { getUserList } from '../../../actions'
import { getIssuesByUsersReport } from '../../../api'

class IssuesByUserReport extends Component {
  data = {} // Data got from api call
  height = 300 // height of chart and list

  state = {
    title: '',
    issues: [],
    data: [] // Bar chart data processed version
  }

  componentDidMount() {
    this.props
      .getUserList({})
      .then(() => this.refreshChart())
  }

  refreshChart() {
    getIssuesByUsersReport(this.props.token)
      .then(({ result }) => {
        let temp = []
        this.data = result

        Object.keys(this.data).forEach(key => {
          if (this.props.users[key]) {
            temp.push({
              key,
              count: this.data[key].length
            })
          }
        })

        this.setState({ data: temp })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Paper style={{ padding: '12px' }}>
        <ListSubheader>Kullanıcılardaki Görevler</ListSubheader>

        <Grid container>
          <Grid item xs={12} lg={4}>
            <Chart
              data={this.state.data}
              users={this.props.users}
              height={this.height}
              onClick={userId =>
                this.setState({
                  issues: this.data[userId],
                  title: this.props.users[userId].name
                })
              }
            />
          </Grid>

          <Grid item xs={12} lg={8}>
            <IssueList
              issues={this.state.issues}
              title={this.state.title}
              height={this.height}
            />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

function mapStateToProps({ users: { users, user }, auth: { token } }) {
  return {
    users: _.keyBy(users, '_id'),
    user,
    token
  }
}

export default connect(
  mapStateToProps,
  { getUserList }
)(IssuesByUserReport)
