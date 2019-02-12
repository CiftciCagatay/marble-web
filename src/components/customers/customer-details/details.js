import React from 'react'
import { List, ListItem, ListItemText, Grid } from '@material-ui/core'

export default function(props) {
  const { customer } = props

  const renderDetail = (primary, secondary) => {
    if (!primary) return null

    return (
      <ListItem>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    )
  }

  const renderAddress = () => {
    if (!customer.address) return null

    return (
      <Grid container>
        <Grid xs={12} item>
          {renderDetail(customer.address.line, 'Adres')}
        </Grid>

        <Grid xs={4}>{renderDetail(customer.address.district, 'İlçe')}</Grid>

        <Grid xs={4}>{renderDetail(customer.address.city, 'Şehir')}</Grid>

        <Grid xs={4}>{renderDetail(customer.address.country, 'Ülke')}</Grid>
      </Grid>
    )
  }

  if (!customer) return null

  return (
    <div>
      <List>
        {renderDetail(customer.name, 'İsim')}

        {renderDetail(customer.taxNumber, 'Vergi Numarası')}

        {renderDetail(customer.taxAdministration, 'Vergi Dairesi')}

        {renderAddress()}
      </List>
    </div>
  )
}
