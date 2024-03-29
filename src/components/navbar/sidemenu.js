import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListSubheader,
  Divider
} from '@material-ui/core'

import {
  Info,
  Home,
  List as ListIcon,
  AccountBalance,
  Category as UnitIcon,
  CalendarToday as CalendarIcon,
  Folder as FileIcon,
  People as CustomerIcon,
  Receipt,
  Cake,
  Shop,
  Contacts as ContactsIcon
} from '@material-ui/icons'

import { Link } from 'react-router-dom'

const drawerWidth = 200

const Sidemenu = props => {
  const { open, classes } = props

  const bpmMenuItems = [
    { to: '/calendar', icon: <CalendarIcon />, title: 'Takvim' },
    { to: '/home', icon: <Home />, title: 'Anasayfa' },
    { to: '/issues', icon: <ListIcon />, title: 'Görevler' },
    { to: '/files', icon: <FileIcon />, title: 'Dosyalar' },
    { to: '/knowledgeBase', icon: <AccountBalance />, title: 'Bilgi Bankası' },
    { to: '/units', icon: <UnitIcon />, title: 'Birimler' }
  ]

  const crmMenuItems = [
    { to: '/customers', icon: <CustomerIcon />, title: 'Müşteriler' },
    { to: '/contacts', icon: <ContactsIcon />, title: 'Kişiler' },
    { to: '/sales', icon: <Shop />, title: 'Satışlar' },
    { to: '/offers', icon: <Receipt />, title: 'Teklifler' },
    { to: '/products', icon: <Cake />, title: 'Ürünler' }
  ]

  const endItems = [{ to: '/about', icon: <Info />, title: 'Hakkında' }]

  const renderItems = items => {
    return items.map((item, i) => (
      <Link key={i} to={item.to} style={{ textDecoration: 'none' }}>
        <ListItem button style={{ paddingLeft: '14px' }}>
          <ListItemIcon style={{ fontSize: '20px' }}>{item.icon}</ListItemIcon>
          <ListItemText style={{ padding: '0px' }} primary={item.title} />
        </ListItem>
      </Link>
    ))
  }

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
        {renderItems(bpmMenuItems)}

        <Divider />

        {renderItems(crmMenuItems)}

        <Divider />

        {renderItems(endItems)}
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
