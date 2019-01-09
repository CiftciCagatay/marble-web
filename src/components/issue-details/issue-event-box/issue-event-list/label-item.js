import React from 'react'
import {
  Label as LabelIcon,
  LabelOff as LabelOffIcon
} from '@material-ui/icons'

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
        <div style={{ fontSize: '15px' }}>
          {event.author.name}
          {event.labels.map(label => ', ' + label.text)} etiketlerini{' '}
          {event.type === 'addLabel' ? 'ekledi.' : 'çıkardı.'}
        </div>
      </div>
    </div>
  )
}

export default LabelItem
