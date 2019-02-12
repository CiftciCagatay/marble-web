import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'

export default function(props) {
  const { contact } = props

  const renderDetail = (primary, secondary) => {
    if (!primary) return null

    return (
      <ListItem>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    )
  }

  if (!contact) return null

  return (
    <div>
      <List>
        {renderDetail(contact.name, 'İsim')}

        {renderDetail(contact.company && contact.company.name, 'Şirket')}

        {renderDetail(contact.departmant, 'Departman')}
        
        {renderDetail(contact.position, 'Pozisyon')}

        {renderDetail(contact.email, 'Email')}
        
        {renderDetail(contact.phone, 'Telefon')}
      </List>
    </div>
  )
}
