import React, { useState, Fragment } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  IconButton,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'
import { Schedule as ScheduleIcon, Add as AddIcon } from '@material-ui/icons'

import UserAvatar from '../../common/user-avatar'

import Details from './details'
import Activities from './activities'
import Files from './files'
import Notes from './notes'
import Offers from './offers'
import Sales from './sales'
import Orders from './orders'

export default function(props) {
  const { customer } = props
  const [tabValue, setTabValue] = useState(0)

  if (!customer) return null

  return (
    <Card>
      <CardHeader
        title={customer.name}
        avatar={<UserAvatar user={customer} />}
        action={
          <Fragment>
            <Tooltip title="Etkinlik Oluştur">
              <IconButton>
                <ScheduleIcon />
              </IconButton>
            </Tooltip>

            <IconButton>
              <Tooltip title="Ekle">
                <AddIcon />
              </Tooltip>
            </IconButton>
          </Fragment>
        }
      />

      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={(_, val) => setTabValue(val)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Bilgiler" />
          <Tab label="Etkinlikler" />
          <Tab label="Notlar" />
          <Tab label="Belgeler" />
          <Tab label="Teklifler" />
          <Tab label="Siparişler" />
          <Tab label="Satışlar" />
        </Tabs>
      </AppBar>

      <CardContent>
        {tabValue === 0 && <Details customer={customer} />}
        {tabValue === 1 && <Activities />}
        {tabValue === 2 && <Notes />}
        {tabValue === 3 && <Files />}
        {tabValue === 4 && <Offers />}
        {tabValue === 5 && <Orders />}
        {tabValue === 6 && <Sales />}
      </CardContent>
    </Card>
  )
}
