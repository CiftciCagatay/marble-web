import React from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  RootRef,
  Typography,
  Grow
} from '@material-ui/core'
import { Droppable } from 'react-beautiful-dnd'
import SaleCard from './sale-card'

export default function(props) {
  const { _id, title, sales } = props

  if (!_id) return null

  return (
    <Grid xs={3} item>
      <Card style={{ backgroundColor: '#E3E4E6' }}>
        <CardHeader
          title={
            <Typography variant="h6" align="center">
              {title}
            </Typography>
          }
        />

        <CardContent>
          <Droppable droppableId={_id}>
            {provided => (
              <RootRef rootRef={provided.innerRef} {...provided.droppableProps}>
                <Grid spacing={8} container>
                  {sales.map((sale, index) => (
                    <SaleCard sale={sale} key={sale._id} index={index} />
                  ))}

                  {provided.placeholder}
                </Grid>
              </RootRef>
            )}
          </Droppable>
        </CardContent>
      </Card>
    </Grid>
  )
}
