import React from 'react'
import { Avatar, Tooltip } from '@material-ui/core'
import ColorHash from 'color-hash'

const UserAvatar = props => {
  const { user, small, big, tooltipHidden } = props

  if (!user || !user.name) return null

  let csl = new ColorHash()
  let backgroundColor = csl.hex(user._id)

  const getInitials = () => user.name.split(' ').map(word => word[0])

  return (
    <Tooltip hidden={tooltipHidden} title={user.name}>
      <Avatar
        component="span"
        style={{
          width: small ? '30px' : big ? '80px' : '40px',
          height: small ? '30px' : big ? '80px' : '40px',
          fontSize: small ? '0.95rem' : big ? '1.75rem' : '1.25rem',
          backgroundColor,
          color: 'white'
        }}
      >
        {getInitials()}
      </Avatar>
    </Tooltip>
  )
}

export default UserAvatar
