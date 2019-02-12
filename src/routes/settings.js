import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import PasswordDialog from '../components/settings/password-dialog'

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 3,
    maxWidth: '800px',
    margin: 'auto'
  },
  icon: { padding: theme.spacing.unit }
})

class Settings extends Component {
  state = {
    passwordDialogOpen: false
  }

  onClosePasswordDialog = () => this.setState({ passwordDialogOpen: false })

  render() {
    const { user, classes } = this.props

    return (
      <div className={classes.container}>
        <Card>
          <CardHeader title="Profil" />

          <CardContent>
            <List>
              <ListItem>
                <ListItemText secondary={user.name} primary="Ad Soyad" />
              </ListItem>

              <ListItem>
                <ListItemText secondary={user.email} primary="Email" />
              </ListItem>

              <ListItem>
                <ListItemText secondary={user.company} primary="Şirket" />
              </ListItem>

              <ListItem
                onClick={() => this.setState({ passwordDialogOpen: true })}
                button
              >
                <ListItemText secondary="******" primary="Şifre" />

                <ListItemSecondaryAction>
                  <ChevronRight className={classes.icon} />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <PasswordDialog
          open={this.state.passwordDialogOpen}
          onClose={this.onClosePasswordDialog}
        />
      </div>
    )
  }
}

function mapStateToProps({ users: { user } }) {
  return { user }
}

export default connect(mapStateToProps)(withStyles(styles)(Settings))
