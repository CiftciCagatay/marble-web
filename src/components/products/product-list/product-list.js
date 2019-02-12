import React from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core'

import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchProducts } from '../../../actions'
import { ROOT_URL, BPM_PORT } from '../../../api/config'

class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <List>
        {_.map(this.props.products, product => (
          <ListItem key={product._id} onClick={() => this.props.onClick(product)} button>
            <ListItemAvatar>
              <Avatar src={`${ROOT_URL}:${BPM_PORT}${product.image}`} />
            </ListItemAvatar>
  
            <ListItemText primary={product.name} secondary={product.code} />
          </ListItem>
        ))}
      </List>
    )
  }
}

function mapStateToProps({ products }) {
  return { products }
}

export default connect(mapStateToProps, { fetchProducts })(ProductList)
