import React, { Fragment } from 'react'

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core'

import {
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  LibraryBooks as ExcelIcon
} from '@material-ui/icons'

import { green, red, blue } from '@material-ui/core/colors'
import files from '../../../mocks/files.json'

export default function(props) {
  const colors = {
    excel: green[500],
    pdf: red[500],
    image: blue[500]
  }

  const icons = {
    excel: <ExcelIcon />,
    image: <ImageIcon />,
    pdf: <PdfIcon />
  }

  return (
    <Fragment>
      <List dense>
        {files.map(file => {
          const backgroundColor = colors[file.mimetype]
          const icon = icons[file.mimetype]

          return (
            <ListItem dense button>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor, color: '#fff' }}>
                  {icon}
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={file.originalname} secondary={file.size} />
            </ListItem>
          )
        })}
      </List>
    </Fragment>
  )
}
