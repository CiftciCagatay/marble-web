import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core'

import { InlineDatePicker } from 'material-ui-pickers'

import { connect } from 'react-redux'
import _ from 'lodash'
import {
  createSale,
  updateSale,
  fetchCompanies,
  getUserList
} from '../../../actions'

class SaleFormDialog extends React.Component {
  state = {
    customer: {},
    assignee: {},
    expectedIncome: {
      amount: null,
      currency: 'TRY'
    },
    expectedCompletionDate: null
  }

  componentDidMount() {
    this.props.fetchCompanies()

    this.props.getUserList()
  }

  onSubmit = () => {
    if (this.props.mode === 'create') {
      this.props.createSale(this.state).then(() => this.props.onClose())
    } else {
      this.props.updateSale(this.props.sale._id, this.state).then(() => {
        this.props.onEdit(this.state)
        this.props.onClose()
      })
    }
  }

  render() {
    const { open, onClose, mode, customers, users } = this.props

    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {mode === 'create' ? 'Yeni Satış' : 'Satış Bilgilerini Güncelle'}
        </DialogTitle>

        <DialogContent>
          <FormControl fullWidth>
            <InputLabel shrink>Müşteri</InputLabel>
            <Select
              value={this.state.customer._id}
              onChange={e =>
                this.setState({
                  customer: customers[e.target.value]
                })
              }
            >
              {_.map(customers, customer => (
                <option
                  key={customer._id}
                  value={customer._id}
                  selected={this.state.customer === customer._id}
                >
                  {customer.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel shrink>Görevli</InputLabel>
            <Select
              value={this.state.assignee._id}
              onChange={e => this.setState({ assignee: users[e.target.value] })}
            >
              {_.map(users, user => (
                <option
                  key={user._id}
                  value={user._id}
                  selected={this.state.assignee === user._id}
                >
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Beklenen Gelir"
            value={this.state.expectedIncome.amount}
            onChange={e =>
              this.setState({
                expectedIncome: {
                  ...this.state.expectedIncome,
                  amount: e.target.value
                }
              })
            }
            fullWidth
          />

          <InlineDatePicker
            onlyCalendar
            label="Tahmini Gerçekleşme Tarihi"
            value={this.state.expectedCompletionDate}
            onChange={date => this.setState({ expectedCompletionDate: date })}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button color="primary">Vazgeç</Button>

          <Button color="primary" variant="outlined">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

function mapStateToProps({ companies, users: { users } }) {
  return {
    customers: companies,
    users: _.mapKeys(users, '_id')
  }
}

export default connect(
  mapStateToProps,
  { createSale, updateSale, fetchCompanies, getUserList }
)(SaleFormDialog)
