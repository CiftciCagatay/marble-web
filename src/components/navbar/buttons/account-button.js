import React, { Component } from 'react'
import './account-button.css'
import { connect } from 'react-redux'
import {
  onLogout,
  onChangeAccount,
  onLogin,
  onLoginWithSecret
} from '../../../actions'
import {
  IconButton,
  Button,
  Chip,
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from '@material-ui/core'
import { KeyboardArrowDown, ExitToApp } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import UserAvatar from '../../common/user-avatar'
import _ from 'lodash'

class AccountButton extends Component {
  state = {
    open: false,
    anchorEl: null,
    passwordDialogOpen: false,
    email: '',
    password: ''
  }

  onLoginButtonClicked = () => {
    this.props
      .onLogin({
        email: this.state.email,
        password: this.state.password
      })
      .then(() => {
        this.props.onChangeAccount({ email: this.state.email })
        this.handlePasswordDialogClose()
      })
      .catch(() => this.handlePasswordDialogClose())
  }

  handlePasswordDialogClose() {
    this.setState({ passwordDialogOpen: false, password: '' })
  }

  renderPasswordDialog() {
    return (
      <Dialog
        open={this.state.passwordDialogOpen}
        onClose={this.handlePasswordDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Oturum Açın</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lütfen oturum açmak istediğini hesabın şifresini girin.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Şifre"
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handlePasswordDialogClose} color="primary">
            Vazgeç
          </Button>
          <Button onClick={this.onLoginButtonClicked} color="primary">
            Oturum Aç
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  askPassword = email => {
    this.setState({ email, passwordDialogOpen: true })
  }

  onAccountListItemClick = account => {
    if (account.token) {
      this.props
        .onLoginWithSecret(account)
        .then(() => this.props.onChangeAccount(account))
        .catch(() => this.askPassword(account.email))
    } else {
      this.askPassword(account.email)
    }
  }

  onLogoutButtonClicked = () => {
    this.props.onLogout()
    this.props.history.push('/')
  }

  onClickAccountMenuButton = currentTarget =>
    this.setState({ open: !this.state.open, anchorEl: currentTarget })

  renderAccountButton(account) {
    return (
      <Chip
        avatar={<UserAvatar user={account} small />}
        onClick={({ currentTarget }) =>
          this.onClickAccountMenuButton(currentTarget)
        }
        label={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>{account.company}</span>
            <KeyboardArrowDown />
          </div>
        }
        variant="outlined"
        style={{ color: 'white', borderColor: 'white', marginRight: '8px' }}
        aria-owns={this.state.anchorEl ? 'account-menu' : null}
        aria-haspopup="true"
      />
    )
  }

  render() {
    const { accounts, activeAccountEmail } = this.props.accounts
    const { [activeAccountEmail]: activeAccount, ...restAccounts } = accounts

    return [
      this.renderAccountButton(activeAccount),
      this.renderPasswordDialog(),
      <Menu
        id="account-menu"
        classes="account-list-menu"
        anchorEl={this.state.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={this.state.open}
        onClose={() => this.setState({ open: false })}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            minWidth: '320px',
            maxWidth: '400px',
            backgroundColor: '#fff'
          }}
        >
          <div style={{ padding: '12px' }}>
            <UserAvatar user={activeAccount} big tooltipHidden />
          </div>

          <div style={{ padding: '12px' }}>
            <div style={{ fontWeight: 'bold' }}>{activeAccount.name}</div>
            <div style={{ fontWeight: 'lighter' }}>{activeAccount.company}</div>
          </div>
        </div>
        {Object.keys(restAccounts).length !== 0 && (
          <List
            subheader={
              <ListSubheader component="div">Diğer Hesaplar</ListSubheader>
            }
          >
            {_.map(restAccounts, account => (
              <ListItem
                onClick={() => this.onAccountListItemClick(account)}
                dense
                button
              >
                <UserAvatar user={account} small />
                <ListItemText
                  primary={account.name}
                  secondary={account.company}
                />
              </ListItem>
            ))}
          </List>
        )}

        <Button
          variant="flat"
          fullWidth
          onClick={this.onLogoutButtonClicked}
          style={{
            borderRadius: '0px',
            backgroundColor: '#007D51',
            color: '#fff',
            marginTop: '12px'
          }}
        >
          <ExitToApp />
          Çıkış Yap
        </Button>
      </Menu>
    ]
  }
}

function mapStateToProps({ users: { user }, accounts }) {
  return { user, accounts }
}

export default connect(
  mapStateToProps,
  { onLogout, onChangeAccount, onLogin, onLoginWithSecret }
)(withRouter(AccountButton))
