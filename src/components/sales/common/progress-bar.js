import React from 'react'
import { yellow, blue, green } from '@material-ui/core/colors'

export default function(props) {
  const { progress } = props

  let backgroundColor = yellow[500]

  if (progress >= 50) {
    backgroundColor = blue[500]
  }

  if (progress >= 75) {
    backgroundColor = green[500]
  }

  return (
    <div
      style={{
        height: '4px',
        width: `${progress}%`,
        borderBottomLeftRadius: '2px',
        borderBottomRightRadius: '2px',
        backgroundColor
      }}
    />
  )
}
