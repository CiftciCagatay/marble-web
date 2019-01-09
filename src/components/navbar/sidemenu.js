import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
  Divider
} from '@material-ui/core'

import {
  Info,
  Home,
  List as ListIcon,
  AccountBalance,
  Dashboard,
  ChevronRight,
  ChevronLeft
} from '@material-ui/icons'

import { Link } from 'react-router-dom'

const drawerWidth = 200

const Sidemenu = props => {
  const { open, classes, theme, handleClose } = props

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(
          classes.drawerPaper,
          !open && classes.drawerPaperClose
        )
      }}
      open={open}
    >
      <List style={{ marginTop: '48px' }} component="nav">
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <ListItem button style={{ paddingLeft: '14px' }}>
            <ListItemIcon style={{ fontSize: '20px' }}>
              <Home />
            </ListItemIcon>
            <ListItemText style={{ padding: '0px' }} primary="Anasayfa" />
          </ListItem>
        </Link>

        <Link to="/issues" style={{ textDecoration: 'none' }}>
          <ListItem button style={{ paddingLeft: '14px' }}>
            <ListItemIcon style={{ fontSize: '20px' }}>
              <ListIcon />
            </ListItemIcon>
            <ListItemText style={{ padding: '0px' }} primary="Görevler" />
          </ListItem>
        </Link>

        <Link to="/knowledgeBase" style={{ textDecoration: 'none' }}>
          <ListItem button style={{ paddingLeft: '14px' }}>
            <ListItemIcon style={{ fontSize: '20px' }}>
              <AccountBalance />
            </ListItemIcon>
            <ListItemText style={{ padding: '0px' }} primary="Bilgi Bankası" />
          </ListItem>
        </Link>

        <Link to="/about" style={{ textDecoration: 'none' }}>
          <ListItem button style={{ paddingLeft: '14px' }}>
            <ListItemIcon style={{ fontSize: '20px' }}>
              <Info />
            </ListItemIcon>
            <ListItemText style={{ padding: '0px' }} primary="Hakkında" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: '48px'
    }
  },
  toolbar: {
    height: '48px',
    display: 'flex',
    alignItems: 'center'
  },
  backButton: {
    marginLeft: 12,
    marginRight: 36
  }
})

Sidemenu.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Sidemenu)
