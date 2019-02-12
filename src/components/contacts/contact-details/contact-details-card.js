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

export default function(props) {
  const { contact } = props
  const [tabValue, setTabValue] = useState(0)

  if (!contact) return null

  return (
    <Card>
      <CardHeader
        title={contact.name}
        avatar={<UserAvatar user={contact} />}
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
        </Tabs>
      </AppBar>

      <CardContent>
        {tabValue === 0 && <Details contact={contact} />}
      </CardContent>
    </Card>
  )
}
