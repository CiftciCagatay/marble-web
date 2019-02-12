import React, { Component } from 'react'
import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  Avatar,
  AppBar,
  Toolbar,
  TextField,
  Grid,
  Typography
} from '@material-ui/core'
import { Settings, Search as SearchIcon } from '@material-ui/icons'
import UserAvatar from '../../common/user-avatar'

import _ from 'lodash'
import { connect } from 'react-redux'
import { getUserList } from '../../../actions'

class AssigneePopoverButton extends Component {
  state = {
    anchorEl: null
  }

  componentDidUpdate(prevProps) {
    const { unit } = this.props

    if (unit !== prevProps.unit) {
      this.props.getUserList({ unit })
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  renderList = () => {
    if (Object.keys(this.props.selectedUsers).length === 0)
      return (
        <Typography variant="body1" align="center">
          Hiç kimse
        </Typography>
      )

    return (
      <List dense disablePadding>
        {_.map(this.props.selectedUsers, user => (
          <ListItem key={user._id} dense disableGutters>
            <ListItemAvatar>
              <UserAvatar small user={user} />
            </ListItemAvatar>

            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    )
  }

  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl) && !this.props.disabled

    return (
      <div>
        <Button
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          size="small"
          disabled={this.props.disabled}
          fullWidth
        >
          <Grid justify="space-between" alignItems="center" container>
            <Grid xs item>
              <Typography variant="button" align="left">
                Görevliler
              </Typography>
            </Grid>

            <Grid item>
              <Settings />
            </Grid>
          </Grid>
        </Button>

        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={16} alignItems="center">
                <Grid item>
                  <SearchIcon color="inherit" />
                </Grid>

                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Kullanıcıları filtrele"
                    InputProps={{
                      disableUnderline: true
                    }}
                  />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <List dense>
            {this.props.unit &&
              _.map(this.props.users, user => {
                const checked = Boolean(this.props.selectedUsers[user._id])

                return (
                  <ListItem
                    key={user._id}
                    button
                    onClick={
                      checked
                        ? () => this.props.onDeselectUser(user._id)
                        : () => this.props.onSelectUser(user)
                    }
                  >
                    <ListItemAvatar>
                      <UserAvatar small user={user} />
                    </ListItemAvatar>

                    <ListItemText primary={user.name} />

                    <ListItemSecondaryAction>
                      <Checkbox checked={checked} />
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })}
          </List>
        </Popover>

        {this.renderList()}
      </div>
    )
  }
}

function mapStateToProps({ users: { users } }) {
  return { users }
}

export default connect(
  mapStateToProps,
  { getUserList }
)(AssigneePopoverButton)
