import React, { Component } from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Divider
} from '@material-ui/core'
import { UpdateRounded } from '@material-ui/icons'

import marbleIcon from '../assets/marble-icon.png'
import updateNotes from '../assets/update-notes.json'

class About extends Component {
  state = {
    version: updateNotes.currentVersion,
    selectedVersion: updateNotes.currentVersion
  }

  renderUpdateNotes = () =>
    updateNotes.versions.map(version => (
      <ExpansionPanel
        key={version.number}
        expanded={this.state.selectedVersion === version.number}
        onClick={() => this.setState({ selectedVersion: version.number })}
      >
        <ExpansionPanelSummary>
          <ListItem dense>
            <Avatar>
              <UpdateRounded />
            </Avatar>
            <ListItemText primary={version.number} secondary={version.date} />
          </ListItem>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <div>
            <div>
              <List subheader={<ListSubheader>Düzeltmeler</ListSubheader>}>
                {updateNotes[version.number].fixes.map((fix, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={fix.title} secondary={fix.detail} />
                  </ListItem>
                ))}
              </List>
            </div>

            <Divider />

            <div>
              <List subheader={<ListSubheader>Geliştirmeler</ListSubheader>}>
                {updateNotes[version.number].improvements.map((improvement, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={improvement.title}
                      secondary={improvement.detail}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              avatar={<Avatar src={marbleIcon} />}
              title="Marble"
              subheader={`Mevcut Sürüm : ${this.state.version}`}
            />
            <CardContent>
              <Typography variant="body1">
                Marble, iş süreçlerinin kolay ve efektif bir şekilde takip
                edilmesini, yönetilmesini sağlamayı amaçlayan bir iş süreci
                takip yazılımıdır.
              </Typography>

              <br />

              <Typography variant="body1">
                Geri bildirimleriniz bizim için çok değerli. Aşağıdaki email
                adresinden bize istediğiniz zaman ulaşabilirsiniz.
              </Typography>

              <br />

              <Typography variant="body1">im.cgtycftc@gmail.com </Typography>

              <br />

              <Typography variant="body1">Arctory</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {this.renderUpdateNotes()}
        </Grid>
      </Grid>
    )
  }
}

export default About
