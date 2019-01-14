import React, { Component } from 'react'
import { connect } from 'react-redux'

class AccessControl extends Component {
  render() {
    const { permission, user } = this.props

    if (!user || !user.permissions || !user.permissions.includes(permission))
      return null

    return this.props.children
  }
}

function mapStateToProps({ users: { user } }) {
  return { user }
}

export default connect(mapStateToProps)(AccessControl)
