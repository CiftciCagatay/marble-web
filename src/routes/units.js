import React from 'react'
import { Grid } from '@material-ui/core'

import UnitList from '../components/units/unit-list'
import UnitDetails from '../components/units/unit-details'
import UnitDialog from '../components/units/unit-dialog'

class Units extends React.Component {
  state = {
    unitId: '',
    dialogOpen: false,
    dialogMode: 'create',
    dialogUnit: { name: '', description: '' }
  }

  openUnitDialog = (dialogMode, dialogUnit) => {
    this.setState({
      dialogOpen: true,
      dialogMode,
      dialogUnit
    })
  }

  render() {
    const { dialogOpen, dialogMode, dialogUnit } = this.state

    return [
      <Grid spacing={16} container>
        <Grid item>
          <UnitList
            openUnitDialog={this.openUnitDialog}
            onClickUnit={unitId => this.setState({ unitId })}
          />
        </Grid>

        <Grid xs item>
          <UnitDetails
            openUnitDialog={this.openUnitDialog}
            unitId={this.state.unitId}
          />
        </Grid>
      </Grid>,

      <UnitDialog
        open={dialogOpen}
        mode={dialogMode}
        unit={dialogUnit}
        handleClose={() => this.setState({ dialogOpen: false })}
      />
    ]
  }
}

export default Units
