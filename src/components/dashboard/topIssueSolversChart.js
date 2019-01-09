import React, { Component } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Bar,
  LabelList
} from 'recharts'

import { connect } from 'react-redux'
import { fetchSolverGuildReport } from '../../actions'

class TopIssueSolversChart extends Component {
  componentDidMount() {
    this.props.fetchSolverGuildReport()
  }

  render() {
    if (!this.props.solversGuild) return null

    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={this.props.solversGuild.slice(0, 3)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id.name" />
          <YAxis />
          <Legend />
          <Bar name="Bitirilen Görev Sayısı" dataKey="count" fill="#8884d8">
            <LabelList dataKey="count" position="insideTop" angle="45" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

function mapStateToProps({ report: { solversGuild } }) {
  return {
    solversGuild
  }
}

export default connect(
  mapStateToProps,
  { fetchSolverGuildReport }
)(TopIssueSolversChart)
