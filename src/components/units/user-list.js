import React, { Component } from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  AppBar,
  Avatar,
  Toolbar,
  Grid,
  TextField,
  Button,
  Tooltip,
  IconButton
} from '@material-ui/core'
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Star as AdminIcon
} from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import _ from 'lodash'
import { getUsersByUnit, removeUserFromUnit } from '../../api'

import UserDialog from './user-dialog'
import DeleteForeverDialog from '../common/delete-forever-dialog'
import AccessControl from '../common/access-control'
import { UPDATE_UNIT } from '../../config'

const styles = theme => ({
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  addUser: {
    marginRight: theme.spacing.unit
  }
})

class UserList extends Component {
  state = {
    users: {},
    selectedUserId: '',
    userDialogMode: 'create',
    userDialogOpen: false,
    deleteDialogOpen: false
  }

  componentDidMount() {
    const { unit } = this.props

    if (unit) {
      this.getUsers(unit)
    }
  }

  componentDidUpdate(prevProps) {
    const { unit } = this.props

    if (prevProps.unit !== unit) {
      this.getUsers(unit)
    }
  }

  getUsers = unit => {
    getUsersByUnit(this.props.accessToken, unit)
      .then(response => response.json())
      .then(({ results }) =>
        this.setState({ users: _.mapKeys(results, '_id') })
      )
  }

  onClickRemoveUser = userId => {
    const { accessToken, unit } = this.props

    this.setState({ selectedUserId: '', deleteDialogOpen: false })

    removeUserFromUnit(accessToken, {
      userId,
      unitId: unit
    }).then(() => {
      this.getUsers(unit)
    })
  }

  renderList = () => {
    if (!this.state.users)
      return (
        <Typography color="textSecondary" align="center">
          Hiç kayıtlı kullanıcı bulunamadı
        </Typography>
      )

    return (
      <List dense>
        {_.map(this.state.users, user => {
          const units = user.units.filter(
            ({ unitId }) => unitId === this.props.unit
          )

          if (!units) return null

          const unit = units[0]

          return (
            <ListItem key={user._id} dense>
              <ListItemAvatar>
                <Avatar>{unit && unit.isAdmin ? <AdminIcon /> : null}</Avatar>
              </ListItemAvatar>

              <ListItemText primary={user.name} />

              <ListItemSecondaryAction>
                <AccessControl
                  permission={UPDATE_UNIT}
                  unitId={this.props.unit}
                >
                  <Button
                    onClick={() =>
                      this.setState({
                        deleteDialogOpen: true,
                        selectedUserId: user._id
                      })
                    }
                  >
                    Sil
                  </Button>
                </AccessControl>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    )
  }

  renderToolbar = () => {
    const { classes } = this.props

    return (
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={16} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Ara"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput
                }}
              />
            </Grid>
            <Grid item>
              {
                <AccessControl
                  permission={UPDATE_UNIT}
                  unitId={this.props.unit}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.addUser}
                    onClick={() =>
                      this.setState({
                        userDialogMode: 'create',
                        userDialogOpen: true
                      })
                    }
                  >
                    Kullanıcı Ekle
                  </Button>
                </AccessControl>
              }
              <Tooltip title="Yenile">
                <IconButton onClick={() => this.getUsers(this.props.unit)}>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }

  render() {
    return (
      <div>
        {this.renderToolbar()}
        {this.renderList()}

        <UserDialog
          open={this.state.userDialogOpen}
          selectedUsers={this.state.users}
          onAddUser={() => this.getUsers(this.props.unit)}
          unitId={this.props.unit}
          mode={this.state.userDialogMode}
          onClose={() => this.setState({ userDialogOpen: false })}
        />

        <DeleteForeverDialog
          title="Kullanıcıyı Birimden Çıkar"
          detail="Kullanıcıyı birimden çıkarmak istediğinize emin misiniz?"
          onClickCancel={() =>
            this.setState({ deleteDialogOpen: false, selectedUserId: '' })
          }
          onClickDelete={() =>
            this.onClickRemoveUser(this.state.selectedUserId)
          }
          open={this.state.deleteDialogOpen}
        />
      </div>
    )
  }
}

function mapStateToProps({ auth: { accessToken } }) {
  return { accessToken }
}

export default connect(mapStateToProps)(withStyles(styles)(UserList))
