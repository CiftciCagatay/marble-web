import React, { useState } from 'react'
import {
  Grid,
  Paper,
  IconButton,
  InputBase,
  Divider,
  Fab
} from '@material-ui/core'
import {
  Search as SearchIcon,
  Sort as SortIcon,
  Add as AddIcon
} from '@material-ui/icons'

import CustomerList from '../components/customers/customer-list/customer-list'
import CustomerDetailsCard from '../components/customers/customer-details/customer-details-card'
import CustomerForm from '../components/customers/customer-form/customer-form'

function Searchbar() {
  return (
    <Paper
      style={{
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
      }}
      elevation={1}
    >
      <IconButton
        style={{
          padding: 10
        }}
        disabled
      >
        <SearchIcon />
      </IconButton>

      <InputBase
        style={{
          marginLeft: 8,
          flex: 1
        }}
        placeholder="Müşterilerde Ara"
      />

      <Divider
        style={{
          width: 1,
          height: 28,
          margin: 4
        }}
      />

      <IconButton color="primary">
        <SortIcon />
      </IconButton>
    </Paper>
  )
}

export default function() {
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerFormOpen, setCustomerFormOpen] = useState(false)

  return [
    <Grid spacing={32} container>
      <Grid xs={4} item>
        <Searchbar />

        <div style={{ marginTop: 8 }}>
          <CustomerList onClick={setSelectedCustomer} />
        </div>
      </Grid>

      <Grid xs={8} item>
        <CustomerDetailsCard customer={selectedCustomer} />
      </Grid>
    </Grid>,

    <Fab
      color="primary"
      variant="extended"
      style={{ position: 'absolute', right: 12, bottom: 12 }}
      onClick={() => setCustomerFormOpen(true)}
    >
      <AddIcon />
      Yeni Müşteri
    </Fab>,

    <CustomerForm
      open={customerFormOpen}
      onClose={() => setCustomerFormOpen(false)}
    />
  ]
}
