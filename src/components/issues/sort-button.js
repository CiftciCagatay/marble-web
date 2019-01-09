import React, { Component } from 'react'
import {
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  ListItemSecondaryAction
} from '@material-ui/core'
import { ImportExport, Check } from '@material-ui/icons'

class SortButton extends Component {
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
        <Tooltip title="Sırala">
          <IconButton
            aria-owns={this.state.anchorEl ? 'sort-popover' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <ImportExport />
          </IconButton>
        </Tooltip>

        <Popover
          id="sort-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <List dense={true}>
            <ListItem onClick={() => onChange('updatedAt')} button>
              Aktifliğe Göre
              <ListItemSecondaryAction>
                {value === 'updatedAt' && <Check />}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem onClick={() => onChange('priority')} button>
              Önceliğe Göre
              <ListItemSecondaryAction>
                {value === 'priority' && <Check />}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem onClick={() => onChange('createdAt')} button>
              Oluşturulma Tarihine Göre
              <ListItemSecondaryAction>
                {value === 'createdAt' && <Check />}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Popover>
      </div>
    )
  }
}

export default SortButton
