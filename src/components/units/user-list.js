import React, { Component } from 'react'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  AppBar,
  Paper,
  Toolbar,
  Grid,
  TextField,
  Button,
  Tooltip,
  IconButton
} from '@material-ui/core'
import {
  Search as SearchIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import _ from 'lodash'
import { getUserList } from '../../actions'

const styles = theme => ({
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
  }
})

class UserList extends Component {
  componentDidMount() {
    const { unit } = this.props

    if (unit) {
      this.props.getUserList({ unit })
    }
  }

  componentDidUpdate(prevProps) {
    const { unit } = this.props

    if (prevProps.unit !== unit) {
      this.props.getUserList({ unit })
    }
  }

  renderList = () => {
    if (!this.props.users)
      return (
        <Typography color="textSecondary" align="center">
          Hiç kayıtlı kullanıcı bulunamadı
        </Typography>
      )

    return (
      <Table>
        <TableBody>
          {_.map(this.props.users, user => (
            <TableRow>
              <TableCell>{user.name}</TableCell>
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  renderToolbar = () => {
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
              {/*
              <Button
                variant="contained"
                color="primary"
                className={classes.addUser}
                onClick={() => console.log(this.props.users)}
              >
                Kullanıcı Ekle
              </Button>
              */}
              <Tooltip title="Yenile">
                <IconButton
                  onClick={() =>
                    this.props.getUserList({ unit: this.props.unit })
                  }
                >
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }

  render() {
    return (
      <div>
        {this.renderToolbar()}
        {this.renderList()}
      </div>
    )
  }
}

function mapStateToProps({ users: { users } }) {
  return { users }
}

export default connect(
  mapStateToProps,
  { getUserList }
)(withStyles(styles)(UserList))
