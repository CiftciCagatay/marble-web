import React, { PureComponent } from 'react'
import IssueListItem from './issue-list-item'
import SortButton from './sort-button'
import FilterButton from './filter-button'
import Searchbar from './searchbar'
import { Card, List, ListItem } from '@material-ui/core'

import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchIssues } from '../../actions'
import { withRouter } from 'react-router-dom'
import querySearch from 'stringquery'

class IssueList extends PureComponent {
  state = {
    isOpen: this.props.isOpen,
    search: '',
    orderBy: 'updatedAt',
    filter: 'all',
    createdBy: '',
    assignees: [],
    priority: null,
    solvedBy: ''
  }

  componentDidMount() {
    const params = querySearch(this.props.location.search)

    this.setState(
      {
        search: params.search || '',
        orderBy: params.orderBy || 'updatedAt',
        filter: params.filter || 'all',
        createdBy: params.createdBy || '',
        assignees: params.assignedToMe ? [this.props.user._id] : [],
        priority: params.priority || null,
        solvedBy: params.solvedBy || ''
      },
      () => this.fetchIssues()
    )
  }

  onSearchbarTextChange = search => {
    this.setState({ search }, this.fetchIssues())
  }

  onSortChange = orderBy => {
    this.setState({ orderBy }, () => this.fetchIssues())
  }

  onFilterChange = filter => {
    let newState = { ...this.state, filter }

    switch (filter) {
      case 'assignedToMe':
        newState = {
          ...newState,
          assignees: [this.props.user._id]
        }
        break
      case 'createdByMe':
        newState = {
          ...newState,
          createdBy: this.props.user._id,
          assignees: []
        }
        break
      default:
        newState = {
          ...newState,
          createdBy: '',
          assignees: []
        }
    }

    this.setState(newState, () => this.fetchIssues())
  }

  fetchIssues = _.debounce(() => {
    const {
      isOpen,
      search,
      orderBy,
      createdBy,
      assignees,
      priority,
      solvedBy
    } = this.state

    let query = { search, orderBy, createdBy, assignees, isOpen }

    if (priority) query['priority'] = priority
    if (solvedBy) query['solvedBy'] = solvedBy

    this.props.fetchIssues(query)
  }, 300)

  render() {
    return (
      <Card>
        <ListItem>
          <Searchbar
            value={this.state.search}
            onChange={this.onSearchbarTextChange}
          />
          <FilterButton
            value={this.state.filter}
            onChange={this.onFilterChange}
          />
          <SortButton value={this.state.orderBy} onChange={this.onSortChange} />
        </ListItem>

        <List>
          {_.map(this.props.issues, issue => (
            <IssueListItem key={issue._id} issue={issue} />
          ))}
        </List>
      </Card>
    )
  }
}

function mapStateToProps({ issues, users: { user } }) {
  return { issues, user }
}

export default connect(
  mapStateToProps,
  { fetchIssues }
)(withRouter(IssueList))
