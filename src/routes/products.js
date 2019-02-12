import React, { Fragment, useState } from 'react'

import {
  Card,
  Paper,
  InputBase,
  IconButton,
  Divider,
  Grid,
  Fab
} from '@material-ui/core'
import {
  Search as SearchIcon,
  Sort as SortIcon,
  Add as AddIcon
} from '@material-ui/icons'

import mockData from '../mocks/products.json'

import ProductList from '../components/products/product-list/product-list'
import ProductForm from '../components/products/product-form/product-form'
import ProductDetailsCard from '../components/products/product-details/product-details-card'

function Searchbar() {
  return (
    <Paper
      style={{
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
      }}
      elevation={1}
    >
      <IconButton
        style={{
          padding: 10
        }}
        disabled
      >
        <SearchIcon />
      </IconButton>

      <InputBase
        style={{
          marginLeft: 8,
          flex: 1
        }}
        placeholder="Ürünlerde Ara"
      />

      <Divider
        style={{
          width: 1,
          height: 28,
          margin: 4
        }}
      />

      <IconButton color="primary">
        <SortIcon />
      </IconButton>
    </Paper>
  )
}

export default function() {
  const { products } = mockData
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productFormOpen, setProductFormOpen] = useState(false)
  const [productFormMode, setProductFormMode] = useState('create')

  return (
    <Fragment>
      <Grid spacing={32} container>
        <Grid xs={4} item>
          <Searchbar />

          <Card style={{ marginTop: 8 }}>
            <ProductList products={products} onClick={setSelectedProduct} />
          </Card>
        </Grid>

        <Grid xs={8} item>
          <ProductDetailsCard
            product={selectedProduct}
            onClickEdit={() => {
              setProductFormMode('update')
              setProductFormOpen(true)
            }}
          />
        </Grid>
      </Grid>

      <Fab
        color="primary"
        variant="extended"
        style={{ position: 'absolute', right: 12, bottom: 12 }}
        onClick={() => {
          setProductFormMode('create')
          setProductFormOpen(true)
        }}
      >
        <AddIcon />
        Yeni Ürün
      </Fab>

      <ProductForm
        open={productFormOpen}
        mode={productFormMode}
        product={selectedProduct}
        onClose={() => setProductFormOpen(false)}
        onEdit={product =>
          setSelectedProduct({ ...selectedProduct, ...product })
        }
      />
    </Fragment>
  )
}
