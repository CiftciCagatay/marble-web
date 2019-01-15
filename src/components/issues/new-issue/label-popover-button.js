import React, { Component } from 'react'
import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemSecondaryAction,
  Typography,
  ListItemText,
  Checkbox,
  AppBar,
  Toolbar,
  TextField,
  Grid
} from '@material-ui/core'
import { Settings, Search as SearchIcon } from '@material-ui/icons'
import Label from '../../common/label'

import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchLabels } from '../../../actions'

class LabelPopoverButton extends Component {
  state = {
    anchorEl: null
  }

  componentDidUpdate(prevProps) {
    const { unit } = this.props

    if (unit !== prevProps.unit) {
      this.props.fetchLabels({ unit })
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  renderList = () => {
    const { selectedLabels } = this.props

    if (Object.keys(selectedLabels).length === 0)
      return (
        <Typography variant="body1" align="center">
          Henüz seçilmedi
        </Typography>
      )

    return (
      <div>
        {_.map(selectedLabels, label => (
          <Label label={label} />
        ))}
      </div>
    )
  }

  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl) && !this.props.disabled

    return (
      <div>
        <Button
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          size="small"
          disabled={this.props.disabled}
          fullWidth
        >
          <Grid justify="space-between" alignItems="center" container>
            <Grid xs item>
              <Typography variant="button" align="left">
                Etiketler
              </Typography>
            </Grid>

            <Grid item>
              <Settings />
            </Grid>
          </Grid>
        </Button>

        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={16} alignItems="center">
                <Grid item>
                  <SearchIcon color="inherit" />
                </Grid>

                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Etiketleri filtrele"
                    InputProps={{
                      disableUnderline: true
                    }}
                  />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <List dense>
            {this.props.unit &&
              _.map(this.props.labels, label => {
                const checked = Boolean(this.props.selectedLabels[label._id])

                return (
                  <ListItem
                    key={label._id}
                    button
                    onClick={
                      checked
                        ? () => this.props.onDeselectLabel(label._id)
                        : () => this.props.onSelectLabel(label)
                    }
                    dense
                  >
                    <Label label={label} />

                    <ListItemSecondaryAction>
                      <Checkbox checked={checked} />
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })}
          </List>
        </Popover>

        {this.renderList()}
      </div>
    )
  }
}

function mapStateToProps({ labels }) {
  return { labels }
}

export default connect(
  mapStateToProps,
  { fetchLabels }
)(LabelPopoverButton)
