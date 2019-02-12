import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Fade,
  CardActions,
  IconButton
} from '@material-ui/core'
import { ROOT_URL, BPM_PORT } from '../../../api/config'
import { Edit } from '@material-ui/icons';

export default function(props) {
  const { product, onClickEdit } = props

  if (!product) return null

  return (
    <Fade in={Boolean(product)} mountOnEnter>
      <Card style={{ display: 'flex', flexDirection: 'row', padding: 8 }}>
        {product.image && (
          <CardMedia
            image={`${ROOT_URL}:${BPM_PORT}${product.image}`}
            style={{ width: '151px', backgroundSize: 'contain' }}
          />
        )}

        <CardContent style={{ flex: 1 }}>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="caption">{product.code}</Typography>

          <Typography variant="body1">
            {product.unitPrice.price}
            {product.unitPrice.currency}
          </Typography>
        </CardContent>
         
        <CardActions>
          <IconButton onClick={onClickEdit}>
            <Edit />
          </IconButton>
        </CardActions>
      </Card>
    </Fade>
  )
}
