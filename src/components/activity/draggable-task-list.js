import React, { Component } from 'react'

import {
  Card,
  CardContent,
  Toolbar,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { Draggable } from 'fullcalendar'

import { connect } from 'react-redux'
import { getIssues } from '../../api'
import _ from 'lodash'

import UserAvatar from '../common/user-avatar'

class DraggableTask extends Component {
  componentDidMount() {
    const { task } = this.props

    const draggableEl = document.getElementById(task._id)

    new Draggable(draggableEl, {
      eventData: { id: task._id, ...task }
    })
  }

  render() {
    const { task } = this.props

    if (!task) return null

    return (
      <ListItem id={task._id} key={task._id} button>
        <ListItemAvatar>
          <UserAvatar user={task.createdBy} />
        </ListItemAvatar>
        <ListItemText
          primary={task.title}
          secondary={task.explanation.substring(0, 140) + '...'}
        />
      </ListItem>
    )
  }
}

class DraggableTaskList extends Component {
  state = {
    search: '',
    tasks: []
  }

  componentDidMount() {
    this.fetchIssues()
  }

  fetchIssues = _.debounce(() => {
    getIssues(this.props.accessToken, { search: this.state.search })
      .then(response => {
        if (response.ok && response.json) {
          return response.json()
        }

        return Promise.resolve({ result: [] })
      })
      .then(({ result }) => this.setState({ tasks: result }))
  }, 250)

  onSearchChange = e => {
    this.setState({ search: e.target.value }, () => this.fetchIssues())
  }

  render() {
    return (
      <Card>
        <Toolbar>
          <SearchIcon />
          <InputBase
            placeholder="İşleri filtrele"
            value={this.state.search}
            onChange={this.onSearchChange}
            fullWidth
          />
        </Toolbar>

        <CardContent>
          <List style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
            {this.state.tasks.map(task => (
              <DraggableTask key={task._id} task={task} />
            ))}
          </List>
        </CardContent>
      </Card>
    )
  }
}

function mapStateToProps({ auth: { accessToken } }) {
  return { accessToken }
}

export default connect(mapStateToProps)(DraggableTaskList)
