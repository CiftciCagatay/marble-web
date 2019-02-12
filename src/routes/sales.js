import React, { useState } from 'react'
import _ from 'lodash'
import {
  Grid,
  Card,
  InputBase,
  Tooltip,
  IconButton,
  Fab
} from '@material-ui/core'
import {
  Search,
  LocalPizza,
  Sort,
  ViewList,
  ViewColumn,
  Add
} from '@material-ui/icons'

import SaleList from '../components/sales/sale-list-view/sale-list'
import SaleColumnView from '../components/sales/sale-column-view/sale-column-view'
import SaleFormDialog from '../components/sales/sale-form/sale-form-dialog'

function Sales() {
  const [displayMode, setDisplayMode] = useState('list')
  const [saleFormDialogOpen, setSaleFormDialogOpen] = useState(false)

  return (
    <React.Fragment>
      <Card
        style={{
          paddingRight: '8px',
          paddingLeft: '8px',
          marginBottom: '16px'
        }}
      >
        <Grid alignItems="center" spacing={8} container>
          <Grid item>
            <Search />
          </Grid>

          <Grid xs item>
            <InputBase placeholder="Ara" fullWidth />
          </Grid>

          <Grid item>
            <Tooltip title="Grupla">
              <IconButton>
                <LocalPizza />
              </IconButton>
            </Tooltip>

            <Tooltip title="Sırala">
              <IconButton>
                <Sort />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid>
            {displayMode === 'column' && (
              <Tooltip title="Liste Görünümü">
                <IconButton onClick={() => setDisplayMode('list')}>
                  <ViewList />
                </IconButton>
              </Tooltip>
            )}
            {displayMode === 'list' && (
              <Tooltip title="Sütun Görünümü">
                <IconButton onClick={() => setDisplayMode('column')}>
                  <ViewColumn />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Card>

      {displayMode === 'list' && (
        <Card>
          <SaleList />
        </Card>
      )}

      {displayMode === 'column' && (
        <SaleColumnView />
      )}

      <Fab
        style={{ position: 'absolute', right: 24, bottom: 24 }}
        color="primary"
        variant="extended"
        onClick={() => setSaleFormDialogOpen(true)}
      >
        <Add />
        Yeni Satış
      </Fab>

      <SaleFormDialog
        mode="create"
        open={saleFormDialogOpen}
        onClose={() => setSaleFormDialogOpen(false)}
      />
    </React.Fragment>
  )
}

export default Sales
