import React, { Component } from 'react'
import { Card, ListItem, ListItemText, Avatar } from '@material-ui/core'
import { PriorityHigh } from '@material-ui/icons'
import { getIssueCount } from '../../../api'
import { connect } from 'react-redux'
import orange from '@material-ui/core/colors/orange'
import { Link } from 'react-router-dom'

class HighPriorityIssuesCard extends Component {
  state = {
    count: 0
  }

  path = `/issues?priority=2&isOpen=true`

  componentDidMount() {
    getIssueCount(this.props.accessToken, {
      priority: 2,
      isOpen: true
    })
      .then(response => {
        if (!response.ok) throw new Error()
        return response.json()
      })
      .then(({ result }) => {
        const count = result[0].count || 0
        this.setState({ count })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Card>
        <Link to={this.path} style={{ textDecoration: 'none'}}>
          <ListItem button>
            <Avatar
              style={{
                margin: 10,
                color: '#fff',
                backgroundColor: orange[500]
              }}
            >
              <PriorityHigh />
            </Avatar>
            <ListItemText
              primary={this.state.count}
              secondary="Yüksek Öncelikli Görevler"
            />
          </ListItem>
        </Link>
      </Card>
    )
  }
}

function mapStateToProps({ users: { user }, auth: { accessToken } }) {
  return { user, accessToken }
}

export default connect(mapStateToProps)(HighPriorityIssuesCard)
