import React from 'react'

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper
} from '@material-ui/core'
import UserAvatar from '../../common/user-avatar'

import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchCompanies } from '../../../actions'

class CustomerList extends React.Component {
  componentDidMount() {
    this.props.fetchCompanies()
  }

  render() {
    const { companies } = this.props

    if (!companies) return null

    return (
      <Paper elevation={1}>
        <List>
          {_.map(companies, company => (
            <ListItem onClick={() => this.props.onClick(company)} button>
              <ListItemAvatar>
                <UserAvatar user={company} />
              </ListItemAvatar>

              <ListItemText primary={company.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    )
  }
}

function mapStateToProps({ companies }) {
  return { companies }
}

export default connect(
  mapStateToProps,
  { fetchCompanies }
)(CustomerList)
