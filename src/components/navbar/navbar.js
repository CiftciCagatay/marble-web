import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import MenuIcon from '@material-ui/icons/Menu'

import classNames from 'classnames'

import Drawer from './sidemenu'
import AccountButton from './buttons/account-button'

import Searchbar from './searchbar'

const drawerWidth = 200

class Navbar extends React.Component {
  state = {
    open: false
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classNames(classes.appBar)}>
          <Toolbar style={{ minHeight: '48px' }} disableGutters>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => this.setState({ open: !this.state.open })}
              className={classNames(classes.menuButton)}
            >
              <MenuIcon style={{ fontSize: '20px' }} />
            </IconButton>

            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              {this.props.title}
            </Typography>

            <AccountButton />
          </Toolbar>
        </AppBar>

        <Drawer open={this.state.open} />

        <main style={{ overflowY: 'scroll' }} className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100vh'
  },
  flex: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#015D58'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    height: '48px',
    minHeight: '48px !important'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit
  }
})

export default withStyles(styles, { withTheme: true })(Navbar)
