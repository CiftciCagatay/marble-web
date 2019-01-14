import React, { Component } from 'react'
import { Card, ListItem, ListItemText, Avatar } from '@material-ui/core'
import { CheckBox } from '@material-ui/icons'
import { getIssueCount } from '../../../api'
import { connect } from 'react-redux'
import green from '@material-ui/core/colors/green'
import { Link } from 'react-router-dom'

class SolvedIssuesCard extends Component {
  state = {
    count: 0
  }

  path = `/knowledgeBase`

  componentDidMount() {
    getIssueCount(this.props.accessToken, {
      isOpen: false
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
      <Card style={{ backgroundColor: 'transparent' }} elevation={0}>
        <Link to={this.path} style={{ textDecoration: 'none' }}>
          <ListItem>
            <Avatar
              style={{
                margin: 10,
                color: '#fff',
                backgroundColor: green[500]
              }}
            >
              <CheckBox />
            </Avatar>
            <ListItemText
              primary={this.state.count}
              secondary="Çözülmüş Görevler"
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

export default connect(mapStateToProps)(SolvedIssuesCard)
