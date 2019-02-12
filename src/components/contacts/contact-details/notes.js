import React, { Fragment } from 'react'

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Divider
} from '@material-ui/core'

import { Attachment as AttachmentIcon } from '@material-ui/icons'

import UserAvatar from '../../common/user-avatar'

import { timeDiff } from '../../../scripts'
import _ from 'lodash'

import notes from '../../../mocks/notes.json'

export default function(props) {
  return (
    <div>
      {_.map(notes, note => (
        <Fragment>
          <Card style={{ marginTop: '12px' }} elevation={0}>
            <CardHeader
              avatar={<UserAvatar user={note.user} />}
              title={note.user.name}
              subheader={timeDiff(note.createdAt)}
            />

            <CardContent>
              <Typography>{note.text}</Typography>

              {note.files.map(file => (
                <div>
                  <Button size="small" color="primary">
                    <AttachmentIcon />
                    {file.originalname} ({file.size})
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Divider />
        </Fragment>
      ))}
    </div>
  )
}
