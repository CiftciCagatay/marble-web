import React from 'react'
import { Typography, Paper } from '@material-ui/core'
import { timeDiff } from '../../../../scripts'

const LabelItem = props => {
  const { event } = props

  return (
    <div style={{ textAlign: 'center', padding: '8px' }} key={event._id}>
      <Paper
        style={{
          display: 'inline-block',
          borderRadius: '2px',
          backgroundColor: '#d9e6fc',
          fontSize: '13px',
          padding: '4px'
        }}
      >
        <Typography>
          {event.author.name}
          {event.labels.map(label => ', ' + label.text)} etiketlerini{' '}
          {event.type === 'addLabel' ? 'ekledi.' : 'çıkardı.'}
        </Typography>

        <Typography variant="caption">{timeDiff(event.date)}</Typography>
      </Paper>
    </div>
  )
}

export default LabelItem
