import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class AccessControl extends Component {
  render() {
    const { permission, user, unitId } = this.props

    // Kullanıcı detayları bilinmiyorsa renderlama
    if (!user) return null

    // Eğer birim id belirtilmişse ve kullanıcının dahil olduğu birimler biliniyorsa
    if (unitId && user.units) {
      // Eğer kullanıcı belirtilen birimde admin ise renderla
      if (user.units[unitId] && user.units[unitId].isAdmin) {
        return this.props.children
      }
    }

    // Eğer sadece yetki bazlı kontrol olacakse (birim id belirtilmemişse)
    if (permission && user.permissions) {
      // Eğer kullanıcı belirtilen izne sahipse renderla
      if (user.permissions.includes(permission)) {
        return this.props.children
      }
    }

    // Birime veya izinlere göre renderlayamadıysan null dön
    return null
  }
}

function mapStateToProps({ users: { user } }) {
  return { user: { ...user, units: _.mapKeys(user.units, 'unitId') } }
}

export default connect(mapStateToProps)(AccessControl)
