import React, { Component, Fragment } from 'react'

import {
  Grid,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Dialog
} from '@material-ui/core'
import {
  CalendarTodayOutlined as CalendarIcon,
  Close as CloseIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons'

export default class HelpDialog extends Component {
  state = {
    path: 'home',
    prevPath: ''
  }

  changePath = path => {
    this.setState({ prevPath: this.state.path, path })
  }

  renderDetailsLayout = layoutId => {
    const { options, onClose } = this.props
    const { title, listItems } = options.details[layoutId]

    return (
      <Fragment>
        <Grid alignItems="center" container>
          <Grid item>
            <IconButton
              onClick={() => this.changePath(this.state.prevPath)}
              style={{ color: '#1967D2' }}
            >
              <BackIcon />
            </IconButton>
          </Grid>

          <Grid xs item>
            <Typography
              variant="h6"
              align="center"
              style={{ color: '#1967D2' }}
            >
              {title}
            </Typography>
          </Grid>

          <Grid item>
            <IconButton onClick={onClose} style={{ color: '#1967D2' }}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Divider />

        <Grid container>
          <Grid item>
            <List>
              {listItems.map((item, index) => (
                <ListItem>
                  <ListItemText primary={`${index + 1}. ${item.primary}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Fragment>
    )
  }

  renderListLayout = layoutId => {
    const { list, onClose } = this.props.options
    const { title, listItems } = list[layoutId]

    return (
      <Fragment>
        <Grid alignItems="center" container>
          <Grid item>
            <IconButton
              onClick={() => this.changePath('home')}
              style={{ color: '#1967D2' }}
            >
              <BackIcon />
            </IconButton>
          </Grid>

          <Grid xs item>
            <Typography
              variant="h6"
              align="center"
              style={{ color: '#1967D2' }}
            >
              {title}
            </Typography>
          </Grid>

          <Grid item>
            <IconButton onClick={onClose} style={{ color: '#1967D2' }}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Divider />

        <Grid justify="center" container>
          <Grid item>
            <List>
              {listItems.map(item => (
                <ListItem
                  onClick={() => this.changePath(`details/${item._id}`)}
                  button
                >
                  <ListItemText
                    primary={item.primary}
                    primaryTypographyProps={{ align: 'center' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Fragment>
    )
  }

  renderHomeLayout = () => {
    const { home } = this.props.options

    return (
      <Fragment>
        <Grid
          style={{ marginTop: '24px', marginBottom: '24px' }}
          spacing={4}
          container
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Avatar style={{ backgroundColor: '#3982F5' }}>
              <CalendarIcon />
            </Avatar>
          </Grid>

          <Grid item>
            <Typography
              variant="h6"
              align="center"
              style={{ color: '#1967D2' }}
            >
              {home.title}
            </Typography>

            <Typography
              variant="body2"
              align="center"
              style={{ color: '#1967D2' }}
            >
              {home.caption}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container justify="center">
          <Grid item>
            <List>
              {home.listItems.map(item => (
                <ListItem
                  onClick={() => this.changePath(`list/${item._id}`)}
                  button
                >
                  <ListItemText
                    primary={item.primary}
                    primaryTypographyProps={{ align: 'center' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Fragment>
    )
  }

  render() {
    const { open, onClose } = this.props
    const { path } = this.state

    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        {path.startsWith('home')
          ? this.renderHomeLayout()
          : path.startsWith('list')
          ? this.renderListLayout(path.split('/')[1])
          : path.startsWith('details')
          ? this.renderDetailsLayout(path.split('/')[1])
          : null}
      </Dialog>
    )
  }
}
