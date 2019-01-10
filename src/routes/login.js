import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import { onLogin, onLoginWithSecret, onRemoveAccount } from '../actions'
import _ from 'lodash'

import marbleIcon from '../assets/marble-icon.png'
import {
  ListItem,
  ListItemText,
  List,
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography
} from '@material-ui/core'
import { AccountCircle, Lock, Remove } from '@material-ui/icons'
import UserAvatar from '../components/common/user-avatar'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    width: '60px',
    height: '60px'
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

class Login extends Component {
  state = {
    email: '',
    password: '',
    logging: false,
    showForm: false,
    removeAccounts: false
  }

  componentDidMount() {
    const { activeAccountEmail, accounts } = this.props.accounts

    if (activeAccountEmail && accounts[activeAccountEmail]) {
      const { accessToken } = accounts[activeAccountEmail]
      if (accessToken) {
        this.loginWithSecret({ email: activeAccountEmail, accessToken })
      }
    }
  }

  loginWithSecret = ({ email, accessToken }) => {
    this.props
      .onLoginWithSecret({ email, accessToken })
      .then(() => {
        localStorage.setItem('showWelcomeMessage', 'true')
        this.pushToHomePage()
      })
      .catch(err => {
        this.setState({ showForm: true, email })
      })
  }

  pushToHomePage = () => {
    this.props.history.push('/home')
  }

  onClickLogin = () => {
    const { email, password } = this.state

    this.props
      .onLogin({ email, password })
      .then(() => {
        this.setState({ logging: false })
        localStorage.setItem('showWelcomeMessage', 'true')
        this.pushToHomePage()
      })
      .catch(() => {
        alert(
          'Email veya şifre hatalı. Lütfen doğru hesap bilgileri ile tekrar deneyin.'
        )
        this.setState({ logging: false })
      })
  }

  handleEmailChange = event => this.setState({ email: event.target.value })

  handlePasswordChange = event =>
    this.setState({ password: event.target.value })

  onClickAccount = account => {
    if (this.state.removeAccounts) {
      this.props.onRemoveAccount(account)
    } else if (account.accessToken) {
      this.loginWithSecret(account)
    } else {
      this.setState({ ...account, showForm: true })
    }
  }

  renderAccounts = accounts => {
    const { removeAccounts } = this.state

    return (
      <List style={{ width: '100%', marginTop: '24px' }} disablePadding>
        {_.map(accounts, account => (
          <ListItem onClick={() => this.onClickAccount(account)} button>
            <UserAvatar user={account} tooltipHidden />
            <ListItemText primary={account.name} secondary={account.company} />

            {removeAccounts && <Remove />}
          </ListItem>
        ))}

        {!removeAccounts && (
          <ListItem onClick={() => this.setState({ showForm: true })} button>
            <Avatar>
              <AccountCircle />
            </Avatar>

            <ListItemText primary="Başka bir hesap kullan" />
          </ListItem>
        )}

        <ListItem
          style={{ marginTop: '24px' }}
          onClick={() => this.setState({ removeAccounts: !removeAccounts })}
          button
        >
          <ListItemText
            primary={removeAccounts ? 'Tamamlandı' : 'Hesap kaldır'}
          />
        </ListItem>
      </List>
    )
  }

  renderLoginForm = () => {
    const { classes } = this.props

    return (
      <form className={classes.form} onSubmit={e => e.preventDefault()}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Adresi</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Şifre</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="raised"
          style={{ backgroundColor: '#015D58', color: '#fff' }}
          className={classes.submit}
          onClick={this.onClickLogin}
        >
          Oturum Aç
        </Button>
      </form>
    )
  }

  render() {
    const { classes } = this.props
    const { accounts } = this.props.accounts
    const { showForm, removeAccounts } = this.state

    let keys = Object.keys(accounts)
    const accountsMenu = keys.length && !showForm && !removeAccounts

    let title = accountsMenu
      ? 'Bir hesap seçin'
      : removeAccounts
      ? 'Hesap Kaldır'
      : 'Oturum Aç'

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar} src={marbleIcon} />
            <Typography variant="headline">{title}</Typography>

            {keys.length !== 0 && !showForm && this.renderAccounts(accounts)}
            {(keys.length === 0 || showForm) && this.renderLoginForm()}
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ auth, users: { user }, accounts }) {
  return { ...auth, user, accounts }
}

export default connect(
  mapStateToProps,
  { onLogin, onLoginWithSecret, onRemoveAccount }
)(withStyles(styles)(Login))
