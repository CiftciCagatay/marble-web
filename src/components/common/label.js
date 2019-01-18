import React from 'react'
import { Chip } from '@material-ui/core'
import ColorHash from 'color-hash'

const Label = props => {
  const { label } = props

  if (!label || !label.text) return null

  let csl = new ColorHash()

  return (
    <Chip
      label={label.text}
      style={{
        margin: '2px',
        backgroundColor: label.color ? label.color : csl.hex(label.text),
        color: '#fff'
      }}
      component="span"
    />
  )
}

export default Label
