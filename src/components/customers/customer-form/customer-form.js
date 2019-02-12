import React from 'react'

import { createCompany } from '../../../actions'
import { connect } from 'react-redux'
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid
} from '@material-ui/core'

class CustomerForm extends React.Component {
  state = {
    name: '',
    types: ['customer'],
    taxNumber: '',
    taxAdministration: '',
    address: {
      line: '',
      country: '',
      city: '',
      district: ''
    }
  }

  onSubmit = () => {
    this.props.createCompany(this.state).then(() => this.props.onClose())
  }

  render() {
    const { open, onClose } = this.props
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <TextField
            label="İsim"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            fullWidth
          />

          <TextField
            label="Vergi Numarası"
            value={this.state.taxNumber}
            onChange={e => this.setState({ taxNumber: e.target.value })}
            fullWidth
          />

          <TextField
            label="Vergi Dairesi"
            value={this.state.taxAdministration}
            onChange={e => this.setState({ taxAdministration: e.target.value })}
            fullWidth
          />

          <TextField
            label="Adres"
            value={this.state.address.line}
            onChange={e =>
              this.setState({
                address: { ...this.state.adress, line: e.target.value }
              })
            }
            fullWidth
          />

          <Grid spacing={8} container>
            <Grid xs={4} item>
              <TextField
                label="Ülke"
                value={this.state.address.country}
                onChange={e =>
                  this.setState({
                    address: { ...this.state.adress, country: e.target.value }
                  })
                }
                fullWidth
              />
            </Grid>

            <Grid xs={4} item>
              <TextField
                label="Şehir"
                value={this.state.address.city}
                onChange={e =>
                  this.setState({
                    address: { ...this.state.adress, city: e.target.value }
                  })
                }
                fullWidth
              />
            </Grid>

            <Grid xs={4} item>
              <TextField
                label="İlçe"
                value={this.state.address.district}
                onChange={e =>
                  this.setState({
                    address: { ...this.state.adress, district: e.target.value }
                  })
                }
                fullWidth
              />
            </Grid>
          </Grid>
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

function mapStateToProps({ contacts }) {
  return { contacts }
}

export default connect(
  mapStateToProps,
  { createCompany }
)(CustomerForm)
