import React from 'react'
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core'
import { DeleteForever as DeleteIcon } from '@material-ui/icons'
import { red } from '@material-ui/core/colors'

const DeleteForeverDialog = props => {
  const { title, detail, open, onClickCancel, onClickDelete } = props

  return (
    <Dialog open={open || false}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography variant="body1">{detail}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClickCancel} color="secondary">
          Vazgeç
        </Button>

        <Button onClick={onClickDelete} style={{ color: red[500] }}>
          <DeleteIcon />
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteForeverDialog
