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
import { createCategory, updateCategory } from '../../actions'

class CategoryDialog extends Component {
  state = {
    category: {
      text: '',
      description: '',
      unit: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props

    if (prevProps.category !== category) {
      this.setState({ category })
    }
  }

  onSubmit = () => {
    if (this.props.mode === 'create') {
      this.props
        .createCategory(this.state.category)
        .then(() => this.props.handleClose())
    } else {
      this.props
        .updateCategory(this.state.category)
        .then(() => this.props.handleClose())
    }
  }

  handleChange = id => event => {
    this.setState({
      category: { ...this.state.category, [id]: event.target.value }
    })
  }

  render() {
    const { open, mode, handleClose } = this.props

    return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">
          {mode === 'create' ? 'Kategori Oluştur' : 'Kategori Düzenle'}
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="text2"
            label="İsim"
            value={this.state.category.text}
            onChange={this.handleChange('text')}
            fullWidth
          />

          <TextField
            margin="dense"
            id="desc2"
            label="Açıklama"
            value={this.state.category.description}
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
            disabled={!this.state.category.unit}
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
  { createCategory, updateCategory }
)(CategoryDialog)
