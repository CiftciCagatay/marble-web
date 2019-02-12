import React from 'react'

import { createContact, updateContact, fetchCompanies } from '../../../actions'
import _ from 'lodash'
import { connect } from 'react-redux'

import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core'

class ContactForm extends React.Component {
  state = {
    name: '',
    company: '',
    department: '',
    position: '',
    email: '',
    phone: ''
  }

  componentDidMount() {
    this.props.fetchCompanies()
  }

  componentDidUpdate(prevProps) {
    const { open, mode, contact } = this.props

    if (!prevProps.open && open) {
      if (mode === 'update') {
        this.setState({
          ...contact,
          company: contact.company ? contact.company._id : ''
        })
      } else {
        this.setState({
          name: '',
          company: '',
          department: '',
          position: '',
          email: '',
          phone: ''
        })
      }
    }
  }

  onSubmit = () => {
    if (this.props.mode === 'create') {
      this.props
        .createContact({
          ...this.state,
          company: this.state.company
            ? this.props.companies[this.state.company]
            : null
        })
        .then(() => this.props.onClose())
    } else {
      this.props
        .updateContact({
          ...this.state,
          company: this.state.company
            ? this.props.companies[this.state.company]
            : null
        })
        .then(() => {
          this.props.onEdit(this.state)
          this.props.onClose()
        })
    }
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

          <FormControl fullWidth>
            <InputLabel>Şirket</InputLabel>
            <Select
              value={this.state.company}
              onChange={e => this.setState({ company: e.target.value })}
              fullWidth
            >
              <option value="" selected={!this.state.company} />

              {_.map(this.props.companies, company => (
                <option
                  key={company._id}
                  selected={company._id === this.state.company}
                  value={company._id}
                >
                  {company.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Departman"
            value={this.state.department}
            onChange={e => this.setState({ department: e.target.value })}
            fullWidth
          />

          <TextField
            label="Pozisyon"
            value={this.state.position}
            onChange={e => this.setState({ position: e.target.value })}
            fullWidth
          />

          <TextField
            label="Email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            fullWidth
          />

          <TextField
            label="Telefon"
            value={this.state.phone}
            onChange={e => this.setState({ phone: e.target.value })}
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

function mapStateToProps({ companies }) {
  return { companies }
}

export default connect(
  mapStateToProps,
  { createContact, updateContact, fetchCompanies }
)(ContactForm)
