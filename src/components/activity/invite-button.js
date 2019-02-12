import React, { Component, Fragment } from 'react'

import {
  Tooltip,
  IconButton,
  Popover,
  Toolbar,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  ListItemSecondaryAction
} from '@material-ui/core'

import {
  PersonAdd as InviteIcon,
  Search as SearchIcon,
  Check as CheckIcon
} from '@material-ui/icons'

import UserAvatar from '../common/user-avatar'

import { connect } from 'react-redux'
import { addParticipants } from '../../actions'
import { getUsers } from '../../api'
import _ from 'lodash'

class InviteButton extends Component {
  state = {
    search: '',
    anchorEl: null,
    users: {},
    invitedUsers: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getUsers(this.props.accessToken)
        .then(response => response.json())
        .then(({ results }) => {
          this.setState({
            users: _.mapKeys(
              results
                .filter(
                  ({ _id }) => this.props.selectedUsers.indexOf(_id) === -1
                )
                .map(({ _id, name }) => ({
                  _id,
                  name
                })),
              '_id'
            ),
            loading: false
          })
        })
    })
  }

  handleClose = () => {
    this.setState({ anchorEl: null }, () => {
      if (this.state.invitedUsers.length !== 0) {
        const participants = this.state.invitedUsers.map(_id => ({
          ...this.state.users[_id],
          waitingForResponse: true,
          attending: false
        }))

        this.props
          .addParticipants(this.props.activityId, participants)
          .then(() => this.props.onAddParticipants(participants))
      }
    })
  }

  onClickUser = (user, invited) => {
    if (invited) {
      this.setState({
        invitedUsers: this.state.invitedUsers.filter(_id => _id !== user._id)
      })
    } else {
      this.setState({ invitedUsers: [...this.state.invitedUsers, user._id] })
    }
  }

  render() {
    const { anchorEl, search, loading } = this.state

    return (
      <Fragment>
        <Tooltip title="Kullanıcı Davet Et">
          <IconButton
            onClick={e => this.setState({ anchorEl: e.currentTarget })}
            color="primary"
          >
            <InviteIcon />
          </IconButton>
        </Tooltip>

        <Popover
          id="invite-popper"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Toolbar>
            <SearchIcon />
            <InputBase
              placeholder="Filtrele"
              value={search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </Toolbar>

          {loading && (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress color="primary" />
            </div>
          )}

          {!loading && (
            <List style={{ maxHeight: '400px', overflow: 'scroll' }} dense>
              {_.map(this.state.users, user => {
                const render = user.name
                  .replace(' ', '')
                  .toLowerCase()
                  .includes(search.replace(' ', '').toLowerCase())

                if (!render) return null

                const invited = this.state.invitedUsers.indexOf(user._id) !== -1

                return (
                  <ListItem
                    onClick={() => this.onClickUser(user, invited)}
                    dense
                    button
                  >
                    <ListItemAvatar>
                      <UserAvatar user={user} small />
                    </ListItemAvatar>

                    <ListItemText primary={user.name} />

                    <ListItemSecondaryAction>
                      {invited && <CheckIcon />}
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })}
            </List>
          )}
        </Popover>
      </Fragment>
    )
  }
}

function mapStateToProps({ auth: { accessToken } }) {
  return {
    accessToken
  }
}

export default connect(
  mapStateToProps,
  { addParticipants }
)(InviteButton)
