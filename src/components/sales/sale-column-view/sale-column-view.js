import React from 'react'
import { Grid } from '@material-ui/core'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './column'
import _ from 'lodash'

/**
 *
 * @param { columns, sales } props
 *
 * @param { id: { id: String, title: String, saleIds: String } } columns
 * @param { id: {*} } sales
 */

export default function(props) {
  const { columns, sales } = props

  return (
    <DragDropContext onDragEnd={result => console.log(result)}>
      <Grid container spacing={16}>
        {_.map(columns, column => (
          <Column
            _id={column._id}
            key={column._id}
            title={column.title}
            sales={column.saleIds.map(_id => sales[_id])}
          />
        ))}
      </Grid>
    </DragDropContext>
  )
}
