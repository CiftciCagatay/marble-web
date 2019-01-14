import React, { Component } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'

import { connect } from 'react-redux'
import { createUnit, updateUnit } from '../../actions'

class UnitDialog extends Component {
  state = {
    unit: {
      name: '',
      description: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { unit } = this.props

    if (prevProps.unit !== unit) {
      this.setState({ unit })
    }
  }

  onSubmit = () => {
    if (this.props.mode === 'create') {
      this.props
        .createUnit(this.state.unit)
        .then(() => this.props.handleClose())
    } else {
      this.props
        .updateUnit(this.state.unit)
        .then(() => this.props.handleClose())
    }
  }

  handleChange = id => event => {
    this.setState({ unit: { ...this.state.unit, [id]: event.target.value } })
  }

  render() {
    const { open, mode, handleClose } = this.props

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-unitledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {mode === 'create' ? 'Birim Oluştur' : 'Birim Düzenle'}
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="İsim"
            value={this.state.unit.name}
            onChange={this.handleChange('name')}
            fullWidth
          />

          <TextField
            margin="dense"
            id="desc"
            label="Açıklama"
            value={this.state.unit.description}
            onChange={this.handleChange('description')}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Vazgeç
          </Button>

          <Button onClick={this.onSubmit} color="primary">
            {mode === 'create' ? 'Oluştur' : 'Düzenle'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(
  null,
  { createUnit, updateUnit }
)(UnitDialog)
