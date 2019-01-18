import React from 'react'
import { Typography } from '@material-ui/core'
import { timeDiff } from '../../../../scripts'

const LabelItem = props => {
  const { event } = props

  return (
    <div style={{ textAlign: 'center', padding: '8px' }}>
      <div
        style={{
          display: 'inline-block',
          borderRadius: '2px',
          backgroundColor: '#d9e6fc',
          fontSize: '13px',
          padding: '4px'
        }}
      >
        <Typography variant="body1">
          {event.author.name}
          {event.labels.map(label => ', ' + label.text)} etiketlerini{' '}
          {event.type === 'addLabel' ? 'ekledi.' : 'çıkardı.'}
        </Typography>

        <Typography variant="caption">{timeDiff(event.date)}</Typography>
      </div>
    </div>
  )
}

export default LabelItem
