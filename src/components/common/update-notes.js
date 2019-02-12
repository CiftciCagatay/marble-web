import React, { Component } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core'
import marbleLogo from '../../assets/marble-icon.png'
import versionNotes from '../../assets/update-notes'

export default class UpdateNotes extends Component {
  state = {
    open: false,
    improvements: [],
    fixes: [],
    date: ''
  }

  componentDidMount() {
    let lastReadUpdateNoteVersion = localStorage.getItem(
      'lastReadUpdateNoteVersion'
    )

    if (lastReadUpdateNoteVersion !== versionNotes.currentVersion) {
      const { improvements, fixes, date } = versionNotes[
        versionNotes.currentVersion
      ]

      this.setState({ improvements, fixes, date, open: true })

      localStorage.setItem(
        'lastReadUpdateNoteVersion',
        versionNotes.currentVersion
      )
    }
  }

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={() => this.setState({ open: false })}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Güncelleme Notları - {this.state.date}</DialogTitle>

        <DialogContent>
          <Grid alignItems="center" spacing={16} container>
            <Grid xs item>
              <List subheader={<ListSubheader>Düzeltmeler</ListSubheader>}>
                {this.state.fixes.map((fix, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={fix.title} secondary={fix.detail} />
                  </ListItem>
                ))}
              </List>

              <Divider />

              <List subheader={<ListSubheader>Geliştirmeler</ListSubheader>}>
                {this.state.improvements.map((improvement, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={improvement.title}
                      secondary={improvement.detail}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item>
              <img src={marbleLogo} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            onClick={() => this.setState({ open: false })}
          >
            Pencereyi Kapat
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
