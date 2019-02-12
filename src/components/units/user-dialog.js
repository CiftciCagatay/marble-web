import React, { Component } from 'react'

import { getUserList } from '../../actions'
import { addUserToUnit } from '../../api'
import { connect } from 'react-redux'
import _ from 'lodash'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'

class UserDialog extends Component {
  state = {
    userId: '',
    isAdmin: false
  }

  componentDidMount() {
    this.props.getUserList()
  }

  onSubmit = () => {
    if (this.props.mode === 'create') {
      addUserToUnit(this.props.accessToken, {
        ...this.state,
        unitId: this.props.unitId
      }).then(() => {
        this.props.onAddUser(this.state)
        this.props.onClose()
      })
    }
  }

  render() {
    const { mode, selectedUsers, users } = this.props
    const title = mode === 'create' ? 'Kullanıcı Ekle' : 'Kullanıcı Düzenle'

    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div>
            <FormControl fullWidth>
              <InputLabel>Kullanıcı</InputLabel>
              <Select
                value={this.state.userId}
                onChange={e => this.setState({ userId: e.target.value })}
                disabled={this.mode === 'update'}
              >
                {_.map(users, user => {
                  if (selectedUsers[user._id]) return null

                  return <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>

          <FormControlLabel
            control={
              <Checkbox
                value={this.state.isAdmin}
                onChange={e => this.setState({ isAdmin: e.target.checked })}
              />
            }
            label="Yönetici"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={this.props.onClose}>Vazgeç</Button>
          <Button onClick={this.onSubmit}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

function mapStateToProps({ users: { users }, auth: { accessToken } }) {
  return { users, accessToken }
}

export default connect(
  mapStateToProps,
  { getUserList }
)(UserDialog)
