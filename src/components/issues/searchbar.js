import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { Search } from '@material-ui/icons'


const Searchbar = props => {
  const { onChange, value } = props

  return (
    <TextField
      id="full-width"
      placeholder="Ara"
      fullWidth
      margin="dense"
      value={value}
      onChange={e => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        )
      }}
    />
  )
}

export default Searchbar
