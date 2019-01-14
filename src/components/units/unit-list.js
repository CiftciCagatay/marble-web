import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  AppBar,
  Grid,
  Toolbar,
  Tooltip,
  TextField,
  Button,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  Refresh as RefreshIcon,
  Search as SearchIcon
} from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { fetchUnits } from '../../actions'
import _ from 'lodash'

import { CREATE_UNIT } from '../../config'
import AccessControl from '../common/access-control'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  paper: {
    margin: 'auto',
    overflow: 'hidden'
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  addUser: {
    marginRight: theme.spacing.unit
  },
  contentWrapper: {
    margin: '16px'
  }
})

class UnitList extends React.Component {
  componentDidMount() {
    this.props.fetchUnits()
  }

  renderAppBar = () => {
    const { classes } = this.props

    return (
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={16} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Ara"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput
                }}
              />
            </Grid>
            <Grid item>
              <AccessControl permission={CREATE_UNIT}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addUser}
                  onClick={() => this.props.openUnitDialog('create', {})}
                >
                  Yeni Birim
                </Button>
              </AccessControl>

              <Tooltip title="Yenile">
                <IconButton onClick={() => this.props.fetchUnits()}>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }

  renderList = () => {
    const { units, onClickUnit } = this.props

    if (!units)
      return (
        <Typography color="textSecondary" align="center">
          Hiç birim bulunamadı
        </Typography>
      )

    return (
      <List>
        {_.map(units, unit => (
          <ListItem button onClick={() => onClickUnit(unit._id)}>
            <ListItemText primary={unit.name} />
          </ListItem>
        ))}
      </List>
    )
  }

  render() {
    return (
      <Paper elevation={1}>
        {this.renderAppBar()}

        {this.renderList()}
      </Paper>
    )
  }
}

function mapStateToProps({ units }) {
  return { units }
}

export default connect(
  mapStateToProps,
  { fetchUnits }
)(withStyles(styles)(UnitList))
