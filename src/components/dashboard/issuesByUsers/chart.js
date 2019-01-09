import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, Tooltip, Bar } from 'recharts'
import { Paper, Typography } from '@material-ui/core'

const IssuesByUsersChart = props => {
  const { users, data, onClick, height } = props

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <XAxis dataKey="key" interval={0} tick={<CustomTick users={users} />} />
        <Tooltip content={<CustomTooltip users={users} />} />
        <Bar
          name="Görev Sayısı"
          dataKey="count"
          fill="#007D51"
          label={<CustomLabel />}
          onClick={({ key }) => onClick(key)}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

function CustomLabel(props) {
  const { x, y, textAnchor, key, value, index, width, ...others } = props

  if (!value) return null

  return (
    <text
      x={x}
      y={y}
      dy={24}
      dx={width / 2 - value.toString().length * 5}
      key={key}
      fill="#fff"
    >
      {value}
    </text>
  )
}

function CustomTick({ x, y, payload, users }) {
  const user = users[payload.value]

  if (!user) return null

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {user.name.split(' ')[0]}
      </text>
    </g>
  )
}

function CustomTooltip(props) {
  if (!props.payload || props.payload.length === 0) return null

  const { active, users } = props
  const { name, value, payload } = props.payload[0]

  if (!active) return null

  const user = users[payload.key]

  return (
    <Paper style={{ padding: '12px' }} elevation={1}>
      <Typography component="h3" variant="h1" style={{ marginTop: '8px' }}>
        {value}
      </Typography>
      <Typography component="p" style={{ color: '#aaa' }}>
        {name}
      </Typography>
      <Typography component="p">{user ? user.name : ''}</Typography>
    </Paper>
  )
}

export default IssuesByUsersChart
