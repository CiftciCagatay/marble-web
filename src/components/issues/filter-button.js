import React, { Component } from 'react'
import {
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  ListItemSecondaryAction
} from '@material-ui/core'
import { FilterList, Check } from '@material-ui/icons'

class FilterButton extends Component {
  state = {
    anchorEl: null
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  render() {
    const { anchorEl } = this.state
    const { onChange, value } = this.props
    const open = Boolean(anchorEl)

    return (
      <div>
        <Tooltip title="Filtrele">
          <IconButton
            aria-owns={anchorEl ? 'filter-popover' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <FilterList />
          </IconButton>
        </Tooltip>

        <Popover
          id="filter-popper"
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
          <List dense={true}>
            <ListItem onClick={() => onChange('all')} button>
              Tümü
              <ListItemSecondaryAction>
                {value === 'all' && <Check />}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem onClick={() => onChange('assignedToMe')} button>
              Bana Atananlar
              <ListItemSecondaryAction>
                {value === 'assignedToMe' && <Check />}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem onClick={() => onChange('createdByMe')} button>
              Benim Oluşturduklarım
              <ListItemSecondaryAction>
                {value === 'createdByMe' && <Check />}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Popover>
      </div>
    )
  }
}

export default FilterButton
