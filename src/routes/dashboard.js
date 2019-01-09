import React from 'react'
import TopIssueSolversChart from '../components/dashboard/topIssueSolversChart'
import TopIssueCreatorsChart from '../components/dashboard/topIssueCreatorsChart'
import { Grid, Card, CardContent } from '@material-ui/core'

const Dashboard = () => {
  return (
    <Grid container spacing={16}>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <TopIssueSolversChart />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card>
          <CardContent>
            <TopIssueCreatorsChart />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Dashboard
