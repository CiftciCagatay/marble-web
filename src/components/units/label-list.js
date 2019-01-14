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
import { fetchLabels, removeLabel } from '../../actions'

import LabelDialog from './label-dialog'

import { CREATE_LABEL, UPDATE_LABEL, DELETE_LABEL } from '../../config'
import AccessControl from '../common/access-control'

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

class LabelList extends Component {
  state = {
    dialogOpen: false,
    dialogMode: 'create',
    dialogLabel: { text: '', description: '', unit: '' }
  }

  componentDidMount() {
    const { unit } = this.props

    if (unit) {
      this.props.fetchLabels({ unit })
      this.setState({ dialogLabel: { unit } })
    }
  }

  componentDidUpdate(prevProps) {
    const { unit } = this.props

    if (prevProps.unit !== unit) {
      this.props.fetchLabels({ unit })
      this.setState({ dialogLabel: { unit } })
    }
  }

  renderList = () => {
    if (!this.props.labels)
      return (
        <Typography color="textSecondary" align="center">
          Hiç etiket bulunamadı
        </Typography>
      )

    return (
      <Table>
        <TableBody>
          {_.map(this.props.labels, label => (
            <TableRow>
              <TableCell>{label.text}</TableCell>
              <TableCell>{label.description}</TableCell>
              <TableCell>
                <div style={{ float: 'right' }}>
                  <AccessControl permission={UPDATE_LABEL}>
                    <Button
                      onClick={() =>
                        this.setState({
                          dialogOpen: true,
                          dialogMode: 'update',
                          dialogLabel: label
                        })
                      }
                    >
                      Düzenle
                    </Button>
                  </AccessControl>

                  <AccessControl permission={DELETE_LABEL}>
                    <Button onClick={() => this.props.removeLabel(label._id)}>
                      Sil
                    </Button>
                  </AccessControl>
                </div>
              </TableCell>
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
              <AccessControl permission={CREATE_LABEL}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addUser}
                  onClick={() =>
                    this.setState({
                      dialogOpen: true,
                      dialogMode: 'create',
                      dialogLabel: { unit: this.props.unit }
                    })
                  }
                >
                  Yeni Etiket
                </Button>
              </AccessControl>

              <Tooltip title="Yenile">
                <IconButton
                  onClick={() =>
                    this.props.fetchLabels({ unit: this.props.unit })
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
    const { dialogOpen, dialogMode, dialogLabel } = this.state

    return [
      <div>
        {this.renderToolbar()}
        {this.renderList()}
      </div>,
      <LabelDialog
        open={dialogOpen}
        mode={dialogMode}
        label={dialogLabel}
        handleClose={() => this.setState({ dialogOpen: false })}
      />
    ]
  }
}

function mapStateToProps({ labels }) {
  return { labels }
}

export default connect(
  mapStateToProps,
  { fetchLabels, removeLabel }
)(withStyles(styles)(LabelList))
