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
import { fetchContacts } from '../../../actions'

class ContactList extends React.Component {
  componentDidMount() {
    this.props.fetchContacts()
  }

  render() {
    const { contacts } = this.props

    if (!contacts) return null

    return (
      <Paper elevation={1}>
        <List>
          {_.map(contacts, contact => (
            <ListItem
              key={contact._id}
              onClick={() => this.props.onClick(contact)}
              button
            >
              <ListItemAvatar>
                <UserAvatar user={contact} />
              </ListItemAvatar>

              <ListItemText
                primary={contact.name}
                secondary={contact.company && contact.company.name}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    )
  }
}

function mapStateToProps({ contacts }) {
  return { contacts }
}

export default connect(
  mapStateToProps,
  { fetchContacts }
)(ContactList)
