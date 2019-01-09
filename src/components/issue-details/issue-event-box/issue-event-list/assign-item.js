import React from 'react'

const AssignItem = props => {
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
          {event.author.name} bu görevi
          {event.users.map(user => ', ' + user.name)}{' '}
          {event.type === 'assign' ? 'a atadı.' : 'dan aldı.'}
        </div>
      </div>
    </div>
  )
}

export default AssignItem
