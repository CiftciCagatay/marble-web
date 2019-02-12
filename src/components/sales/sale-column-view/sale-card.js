import React from 'react'
import {
  RootRef,
  Grid,
  Card,
  CardContent,
  Typography,
  Grow
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import UserAvatar from '../../common/user-avatar'
import Progress from '../common/progress-bar'
import { Draggable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'

export default function(props) {
  const { sale, index } = props

  if (!sale || !sale._id || typeof index === 'undefined') return null

  return (
    <Draggable draggableId={sale._id} index={index}>
      {provided => (
        <RootRef rootRef={provided.innerRef}>
          <Grid
            xs={12}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            item
          >
            <Link to={`/sales/${sale._id}`}>
              <Grow in={Boolean(sale)}>
                <Card>
                  <CardContent>
                    <Grid alignItems="center" container>
                      <Grid xs item>
                        <Typography variant="body1">{sale.title}</Typography>
                        <Typography variant="caption">
                          {sale.customer.name}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <UserAvatar user={sale.createdBy} />
                      </Grid>
                    </Grid>

                    <Typography style={{ marginTop: '16px' }} variant="body1">
                      {sale.status}
                    </Typography>
                    <Typography variant="caption">24 Şubat</Typography>

                    <Grid
                      style={{ marginTop: '16px' }}
                      alignItems="baseline"
                      container
                    >
                      <Grid item xs>
                        <Typography variant="body1">
                          {sale.totalPrice} ₺
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography>12 Şubat</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <Progress progress={sale.progress} />
                </Card>
              </Grow>
            </Link>
          </Grid>
        </RootRef>
      )}
    </Draggable>
  )
}
