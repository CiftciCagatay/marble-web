import React, { PureComponent } from 'react'
import IssueListItem from './issue-list-item'
import SortButton from './sort-button'
import FilterButton from './filter-button'
import LabelFilterButton from './label-button'
import Searchbar from './searchbar'
import { Card, List, ListItem } from '@material-ui/core'

import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchIssues } from '../../actions'
import { withRouter } from 'react-router-dom'
import querySearch from 'stringquery'

import { MediaBlock } from 'react-placeholder/lib/placeholders'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'

class IssueList extends PureComponent {
  state = {
    ready: false,
    isOpen: this.props.isOpen,
    search: '',
    orderBy: 'updatedAt',
    filter: 'all',
    createdBy: '',
    assignees: [],
    priority: null,
    solvedBy: '',
    labels: {}
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

  onSelectLabel = label => {
    this.setState(
      { labels: { ...this.state.labels, [label._id]: label } },
      () => this.fetchIssues()
    )
  }

  onDeselectLabel = label => {
    const { [label._id]: _, ...labels } = this.state.labels
    this.setState({ labels }, () => this.fetchIssues())
  }

  onClearLabels = () => this.setState({ labels: {} }, () => this.fetchIssues())

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
    this.setState({
      ready: false
    })

    const {
      isOpen,
      search,
      orderBy,
      createdBy,
      assignees,
      priority,
      solvedBy,
      labels
    } = this.state

    let query = {
      search,
      orderBy,
      createdBy,
      assignees,
      isOpen,
      labels: _.map(labels, label => label.text)
    }

    if (priority) query['priority'] = priority
    if (solvedBy) query['solvedBy'] = solvedBy

    this.props.fetchIssues(query).then(() => this.setState({ ready: true }))
  }, 300)

  renderPlaceholder = () => {
    return [0, 1, 2, 3, 4].map(() => (
      <ReactPlaceholder
        type='media'
        style={{ margin: '16px' }}
        rows={3}
        showLoadingAnimation={true}
        ready={this.state.ready}
        firstLaunchOnly={true}
      />
    ))
  }

  render() {
    return (
      <Card>
        <ListItem>
          <Searchbar
            value={this.state.search}
            onChange={this.onSearchbarTextChange}
          />

          <LabelFilterButton
            onSelectLabel={this.onSelectLabel}
            onDeselectLabel={this.onDeselectLabel}
            selectedLabels={this.state.labels}
            onClearLabels={this.onClearLabels}
          />

          <FilterButton
            value={this.state.filter}
            onChange={this.onFilterChange}
          />

          <SortButton value={this.state.orderBy} onChange={this.onSortChange} />
        </ListItem>

        <ReactPlaceholder
          customPlaceholder={this.renderPlaceholder()}
          ready={this.state.ready}
          firstLaunchOnly={true}
        >
          <List>
            {_.map(this.props.issues, issue => (
              <IssueListItem key={issue._id} issue={issue} />
            ))}
          </List>
        </ReactPlaceholder>
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
