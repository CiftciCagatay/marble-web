import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  Button
} from '@material-ui/core'

import LabelList from './label-list'
import UserList from './user-list'
import CategoryList from './category-list'

import { connect } from 'react-redux'
import { fetchUnits, removeUnit } from '../../actions'

import { UPDATE_UNIT, DELETE_UNIT } from '../../config'
import AccessControl from '../common/access-control'
import DeleteForeverDialog from '../common/delete-forever-dialog'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  header: {
    padding: theme.spacing.unit * 2
  }
})

class UnitDetails extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes, units, unitId } = this.props

    if (!units || !unitId) return null

    const { value } = this.state
    const unit = units[unitId]

    if (!unit) return null

    return [
      <Paper key="root" className={classes.root}>
        <div className={classes.header}>
          <Grid container>
            <Grid xs item>
              <Typography variant="h4">{unit.name}</Typography>
              <Typography variant="subtitle1">{unit.name}</Typography>
            </Grid>

            <Grid item>
              <AccessControl permission={UPDATE_UNIT} unitId={unitId}>
                <Button
                  onClick={() => this.props.openUnitDialog('update', unit)}
                >
                  Düzenle
                </Button>
              </AccessControl>

              <AccessControl permission={DELETE_UNIT} unitId={unitId}>
                <Button
                  onClick={() => this.setState({ deleteDialogOpen: true })}
                >
                  Sil
                </Button>
              </AccessControl>
            </Grid>
          </Grid>
        </div>

        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Kullanıcılar" />
            <Tab label="Etiketler" />
            <Tab label="Kategoriler" />
          </Tabs>
        </AppBar>

        {value === 0 && <UserList unit={this.props.unitId} />}
        {value === 1 && <LabelList unit={this.props.unitId} />}
        {value === 2 && <CategoryList unit={this.props.unitId} />}
      </Paper>,

      <DeleteForeverDialog
        key="delete-dialog"
        open={this.state.deleteDialogOpen}
        title="Birimi Sil"
        detail="Birimi silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        onClickCancel={() => this.setState({ deleteDialogOpen: false })}
        onClickDelete={() => this.props.removeUnit(unit._id)}
      />
    ]
  }
}

function mapStateToProps({ units }) {
  return { units }
}

export default connect(
  mapStateToProps,
  { fetchUnits, removeUnit }
)(withStyles(styles)(UnitDetails))
