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
import { createLabel, updateLabel } from '../../actions'

class LabelDialog extends Component {
  state = {
    label: {
      text: '',
      colorCode: '',
      description: '',
      unit: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { label } = this.props
    
    if (prevProps.label !== label) {
      this.setState({ label })
    }
  }

  onSubmit = () => {
    if (this.props.mode === 'create') {
      this.props
        .createLabel(this.state.label)
        .then(() => this.props.handleClose())
    } else {
      this.props
        .updateLabel(this.state.label)
        .then(() => this.props.handleClose())
    }
  }

  handleChange = id => event => {
    this.setState({ label: { ...this.state.label, [id]: event.target.value } })
  }

  render() {
    const { open, mode, handleClose } = this.props

    return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">
          {mode === 'create' ? 'Etiket Oluştur' : 'Etiket Düzenle'}
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="İsim"
            value={this.state.label.text}
            onChange={this.handleChange('text')}
            fullWidth
          />

          <TextField
            margin="dense"
            id="desc"
            label="Açıklama"
            value={this.state.label.description}
            onChange={this.handleChange('description')}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Vazgeç
          </Button>

          <Button
            onClick={this.onSubmit}
            color="primary"
            disabled={!this.state.label.unit}
          >
            {mode === 'create' ? 'Oluştur' : 'Düzenle'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(
  null,
  { createLabel, updateLabel }
)(LabelDialog)
