import React, { Component } from 'react'
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Divider,
  InputBase,
  FormControl,
  InputAdornment
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import {
  Label as LabelIcon,
  Cancel as ClearIcon,
  Search as SearchIcon
} from '@material-ui/icons'

import { connect } from 'react-redux'
import { getLabels } from '../../api'
import { READ_ALL_TASKS } from '../../config'

const styles = theme => ({
  formControl: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit
  }
})

class LabelButton extends Component {
  state = {
    labels: [],
    anchorEl: null
  }

  componentDidMount() {
    const { user, accessToken } = this.props

    let params = {}

    if (!user.permissions || !user.permissions.includes(READ_ALL_TASKS)) {
      params.unit = user.unit
    }

    getLabels(accessToken, params)
      .then(response => response.json())
      .then(({ result }) => this.setState({ labels: result }))
  }

  render() {
    const {
      classes,
      selectedLabels,
      onSelectLabel,
      onDeselectLabel,
      onClearLabels
    } = this.props

    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return [
      <IconButton
        aria-owns={anchorEl ? 'filter-popover' : null}
        aria-haspopup="true"
        onClick={e => this.setState({ anchorEl: e.currentTarget })}
      >
        <LabelIcon />
      </IconButton>,

      <Popover
        id="label-filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => this.setState({ anchorEl: null })}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <FormControl className={classes.formControl}>
          <InputBase
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            placeholder="Filtrele"
          />
        </FormControl>

        <List dense>
          <ListItem onClick={() => onClearLabels()} dense button>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText
              style={{ padding: '0px' }}
              primary="Seçimleri kaldır"
            />
          </ListItem>

          <Divider />

          <div style={{ maxHeight: '250px', overflowY: 'scroll' }}>
            {this.state.labels.map(label => {
              const checked = Boolean(selectedLabels[label._id])
              const onClick = checked
                ? () => onDeselectLabel(label)
                : () => onSelectLabel(label)

              return (
                <ListItem onClick={onClick} dense button>
                  <Checkbox
                    style={{ padding: '0px' }}
                    checked={checked}
                    value={checked}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={label.text} />
                </ListItem>
              )
            })}
          </div>
        </List>
      </Popover>
    ]
  }
}

function mapStateToProps({ users: { user }, auth: { accessToken } }) {
  return {
    user,
    accessToken
  }
}

export default connect(mapStateToProps)(withStyles(styles)(LabelButton))
