import React from 'react'

import { createProduct, updateProduct } from '../../../actions'
import { uploadImage } from '../../../api'
import { ROOT_URL, BPM_PORT } from '../../../api/config'

import { connect } from 'react-redux'
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  Avatar
} from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'

class ProductForm extends React.Component {
  state = {
    name: '',
    code: '',
    image: '',
    unitPrice: {
      price: null,
      currency: 'TRY'
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      if (this.props.mode === 'update') {
        this.setState({ ...this.props.product })
      } else {
        // Set state to initial for create mode
        this.setState({
          name: '',
          code: '',
          image: '',
          unitPrice: {
            price: null,
            currency: 'TRY'
          }
        })
      }
    }
  }

  onSubmit = () => {
    if (this.props.mode === 'create') {
      this.props.createProduct(this.state).then(() => this.props.onClose())
    } else {
      this.props.updateProduct(this.props.product._id, this.state).then(() => {
        this.props.onEdit(this.state)
        this.props.onClose()
      })
    }
  }

  onFileSelect = file => {
    const formData = new FormData()

    formData.append('uploads', file)

    uploadImage(this.props.accessToken, formData)
      .then(response => response.json())
      .then(files =>
        this.setState({ image: files[0].path }, () => console.log(this.state))
      )
  }

  render() {
    const { open, onClose } = this.props

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Grid alignItems="center" direction="column" spacing={8} container>
            <Grid item>
              <label for="fileInput">
                {this.state.image && (
                  <Avatar
                    style={{ height: 100, width: 100, cursor: 'pointer' }}
                    alt="Fotoğrafı Güncelle"
                    src={`${ROOT_URL}:${BPM_PORT}${this.state.image}`}
                  />
                )}

                {!this.state.image && (
                  <Avatar
                    style={{ height: 100, width: 100, cursor: 'pointer' }}
                    alt="Fotoğraf Yükle"
                  >
                    <CloudUpload />
                  </Avatar>
                )}
              </label>
            </Grid>

            <TextField
              id="fileInput"
              type="file"
              onChange={e => this.onFileSelect(e.target.files[0])}
              hidden={true}
            />
          </Grid>

          <TextField
            label="İsim"
            style={{ marginTop: 8 }}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            fullWidth
          />

          <TextField
            label="Kod"
            style={{ marginTop: 8 }}
            value={this.state.code}
            onChange={e => this.setState({ code: e.target.value })}
            fullWidth
          />

          <TextField
            label="Birim Fiyat"
            style={{ marginTop: 8 }}
            value={this.state.unitPrice.price}
            type="number"
            onChange={e =>
              this.setState({
                unitPrice: {
                  ...this.state.unitPrice,
                  price: e.target.value
                }
              })
            }
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Vazgeç
          </Button>

          <Button color="primary" variant="outlined" onClick={this.onSubmit}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

function mapStateToProps({ auth: { accessToken } }) {
  return { accessToken }
}

export default connect(
  mapStateToProps,
  { createProduct, updateProduct }
)(ProductForm)
