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

import ContactList from '../components/contacts/contact-list/contact-list'
import ContactForm from '../components/contacts/contact-form/contact-form'
import ContactDetailsCard from '../components/contacts/contact-details/contact-details-card'

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
        placeholder="Kişilerde Ara"
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
  const [selectedContact, setSelectedContact] = useState(null)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [contactFormMode, setContactFormMode] = useState('create')

  return [
    <Grid spacing={32} container>
      <Grid xs={4} item>
        <Searchbar />

        <div style={{ marginTop: 8 }}>
          <ContactList onClick={setSelectedContact} />
        </div>
      </Grid>

      <Grid xs={8} item>
        <ContactDetailsCard
          contact={selectedContact}
          onClickEdit={() => {
            setContactFormMode('update')
            setContactFormOpen(true)
          }}
        />
      </Grid>
    </Grid>,

    <Fab
      color="primary"
      variant="extended"
      style={{ position: 'absolute', right: 12, bottom: 12 }}
      onClick={() => {
        setContactFormMode('create')
        setContactFormOpen(true)
      }}
    >
      <AddIcon />
      Yeni Kişi
    </Fab>,

    <ContactForm
      open={contactFormOpen}
      contact={selectedContact}
      mode={contactFormMode}
      onClose={() => setContactFormOpen(false)}
    />
  ]
}
