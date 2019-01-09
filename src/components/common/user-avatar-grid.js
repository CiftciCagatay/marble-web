import React from 'react'
import UserAvatar from './user-avatar'
import { Grid } from '@material-ui/core'

const UserAvatarGrid = props => {
  const { users } = props

  if (!users) return <div />

  return (
    <Grid spacing={8} container>
      {users.map(user => (
        <Grid key={user._id} item>
          <UserAvatar user={user} />
        </Grid>
      ))}
    </Grid>
  )
}

export default UserAvatarGrid
