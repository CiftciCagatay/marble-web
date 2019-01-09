import React, { Component } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Bar
} from 'recharts'

import { connect } from 'react-redux'
import { fetchProblemResourcesReport } from '../../actions'

class TopIssueCreatorsChart extends Component {
  componentDidMount() {
    this.props.fetchProblemResourcesReport()
  }

  render() {
    if (!this.props.problemResources) return null
    
    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={this.props.problemResources.slice(0, 4)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id.name" />
          <YAxis />
          <Legend />
          <Bar name="Oluşturulan Görev Sayısı" dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

function mapStateToProps({ report: { problemResources } }) {
  return {
    problemResources
  }
}

export default connect(
  mapStateToProps,
  { fetchProblemResourcesReport }
)(TopIssueCreatorsChart)
