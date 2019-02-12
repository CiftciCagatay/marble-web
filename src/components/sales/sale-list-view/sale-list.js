import React from 'react'
import {
  Table,
  TableRow,
  TableCell,
  Typography,
  TableHead,
  TableBody,
  Grid
} from '@material-ui/core'
import UserAvatar from '../../common/user-avatar'
import ProgressBar from '../common/progress-bar'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchSales } from '../../../actions'
import { Redirect } from 'react-router-dom'

class SaleList extends React.Component {
  state = {
    selectedSaleId: ''
  }
  render() {
    const { sales } = this.props
    const { selectedSaleId } = this.state

    if (selectedSaleId) return <Redirect to={`/sales/${selectedSaleId}`} />

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={1} />
              <TableCell align="center">Müşteri</TableCell>
              <TableCell align="right">Beklenen Gelir</TableCell>
              <TableCell align="center">Son Durum</TableCell>
              <TableCell align="center">İlerleme</TableCell>
              <TableCell align="center">Tahmini Gerçekleşme Tarihi</TableCell>
              <TableCell>Sonraki Adım</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {_.map(sales, sale => (
              <TableRow
                key={sale._id}
                onClick={() => this.setState({ selectedSaleId: sale._id })}
                hover
              >
                <TableCell>
                  <Grid spacing={8} alignItems="center" container>
                    <Grid item>
                      <UserAvatar user={sale.createdBy} />
                    </Grid>

                    <Grid item>
                      <Typography>{sale.title}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell align="center">
                  {sale.customer && sale.customer.name}
                </TableCell>
                <TableCell align="right">{sale.totalPrice}₺</TableCell>
                <TableCell align="center">{sale.status}</TableCell>

                <TableCell align="center">
                  <ProgressBar progress={sale.progress} />
                </TableCell>
                <TableCell align="center">12 Şubat</TableCell>

                <TableCell>
                  <Typography>Teklif düzenlenecek</Typography>
                  <Typography variant="caption">24 Şubat</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps({ sales }) {
  return { sales }
}

export default connect(
  mapStateToProps,
  { fetchSales }
)(SaleList)
