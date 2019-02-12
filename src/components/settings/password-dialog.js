import React, { Component } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  DialogContentText,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { updatePassword } from '../../api'
import { connect } from 'react-redux'

const styles = theme => ({
  formControl: {
    padding: theme.spacing.unit
  },
  container: {
    overflowX: 'hidden'
  }
})

class PasswordDialog extends Component {
  state = {
    newPassword: '',
    newPassword2: '',
    isDirty: false
  }

  onSubmit = () => {
    updatePassword(this.props.accessToken, {
      userId: this.props.user._id,
      password: this.state.newPassword
    }).then(() => {
      this.setState({
        newPassword: '',
        newPassword2: '',
        isDirty: false
      })
      
      this.props.onClose()
    })
  }

  render() {
    const { newPassword, newPassword2, isDirty } = this.state
    const { classes, onClose, open } = this.props
    const valid = newPassword === newPassword2 && newPassword.length >= 4

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Şifreyi Güncelle</DialogTitle>

        <DialogContent className={classes.container}>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              error={!valid && isDirty}
              type="password"
              label="Yeni Şifre"
              value={newPassword}
              onChange={e => this.setState({ newPassword: e.target.value })}
              fullWidth
            />
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <TextField
              error={!valid && isDirty}
              type="password"
              label="Yeni Şifre (Tekrar)"
              value={newPassword2}
              onChange={e => this.setState({ newPassword2: e.target.value })}
              onBlur={() => this.setState({ isDirty: true })}
              fullWidth
            />
          </FormControl>

          <DialogContentText>
            <br />
            <Typography variant="caption">
              * Şifreniz en az 4 haneden oluşmalıdır
            </Typography>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Vazgeç
          </Button>

          <Button disabled={!valid} onClick={this.onSubmit} color="primary">
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

function mapStateToProps({ auth: { accessToken }, users: { user } }) {
  return {
    accessToken,
    user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(PasswordDialog))
