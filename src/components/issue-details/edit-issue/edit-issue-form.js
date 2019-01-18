import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putIssue, fetchCategories, fetchUnits } from '../../../actions'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { map } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import {
  Grid,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core'
import { Update, Cancel } from '@material-ui/icons'
import { timeFormat } from '../../../scripts'

class EditIssueForm extends Component {
  state = {
    _id: '',
    title: '',
    explanation: '',
    summary: '',
    priority: 0,
    category: null,
    subCategory: null,
    unit: null,
    deadline: null,
    subCategories: []
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const {
      _id,
      title,
      explanation,
      category,
      subCategory,
      unit,
      priority,
      deadline,
      summary
    } = this.props.issues[id]

    this.props.fetchCategories({ unit })
    this.props.fetchUnits()

    let subCategories = []

    if (category && this.props.categories[category._id]) {
      subCategories = this.props.categories[category._id].subCategories
    }

    this.setState({
      _id,
      title,
      explanation,
      category,
      subCategory,
      unit,
      subCategories,
      priority,
      deadline,
      summary
    })
  }

  handleFormSubmit = () => {
    const { _id, subCategories, ...body } = this.state

    this.props
      .putIssue(_id, body)
      .then(() => this.props.closeModal())
      .catch(err => console.log(err))
  }

  handleCategoryChange = event => {
    // Eğer boş seçenek seçilmişse
    if (!event.target.value) {
      this.setState({
        category: null,
        subCategory: null,
        subCategories: []
      })
      return
    }

    const { _id, text, subCategories } = this.props.categories[
      event.target.value
    ]

    this.setState({
      category: { _id, text },
      subCategory: null,
      subCategories
    })
  }

  handleSubCategoryChange = event => {
    // Eğer boş seçenek seçilmişse
    if (!event.target.value) {
      this.setState({
        subCategory: null
      })
      return
    }

    this.setState({
      subCategory: this.state.subCategories.filter(
        ({ _id }) => _id === event.target.value
      )[0]
    })
  }

  handleUnitChange = event => {
    // Eğer boş seçenek seçilmişse
    if (!event.target.value) {
      this.setState({
        unit: null
      })
      return
    }

    this.setState({
      unit: this.props.units[event.target.value]
    })
  }

  handleChange = id => event => {
    this.setState({ [id]: event.target.value })
  }

  renderTextField = props => {
    const { classes } = this.props
    const { id } = props

    return (
      <FormControl className={classes.formControl} fullWidth>
        <TextField
          value={this.state[id]}
          onChange={this.handleChange(id)}
          fullWidth
          {...props}
        />
      </FormControl>
    )
  }

  renderSelect = ({ label, id, name, items, labelKey, valueKey, ...props }) => {
    const { classes } = this.props

    return (
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          value={this.state[id]}
          onChange={this.handleUnitChange}
          inputProps={{
            name,
            id
          }}
          native
          {...props}
        >
          <option value="" />
          {map(items, item => (
            <option value={item[valueKey]}>{item[labelKey]}</option>
          ))}
        </Select>
      </FormControl>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <form
        className={classes.container}
        onSubmit={event => event.preventDefault()}
      >
        <Grid container direction="row" spacing={32}>
          <Grid xs={8} item>
            {this.renderTextField({
              helperText: 'Başlık girilmezse otomatik olarak atanacak',
              label: 'Başlık',
              id: 'title'
            })}

            {this.renderTextField({
              id: 'explanation',
              label: 'Açıklama',
              multiline: true,
              rows: 5
            })}

            {this.renderTextField({
              id: 'summary',
              label: 'Özet',
              multiline: true,
              rows: 2
            })}
          </Grid>

          <Grid xs={4} item>
            {this.renderTextField({
              id: 'deadline',
              label: 'Teslim Tarihi',
              type: 'date',
              value: timeFormat(this.state.deadline, 'YYYY-MM-DD'),
              InputLabelProps: {
                shrink: true
              }
            })}

            {this.renderSelect({
              id: 'unit',
              label: 'Birim',
              name: 'unit',
              value: this.state.unit ? this.state.unit._id : '',
              onChange: this.handleUnitChange,
              items: this.props.units,
              labelKey: 'name',
              valueKey: '_id'
            })}

            {this.renderSelect({
              id: 'category',
              label: 'Kategori',
              name: 'category',
              value: this.state.category ? this.state.category._id : '',
              onChange: this.handleCategoryChange,
              items: this.props.categories,
              labelKey: 'text',
              valueKey: '_id'
            })}

            {this.renderSelect({
              id: 'subCategory',
              label: 'Alt Kategori',
              name: 'subCategory',
              value: this.state.subCategory ? this.state.subCategory._id : '',
              onChange: this.handleSubCategoryChange,
              items: this.props.subCategories,
              labelKey: 'text',
              valueKey: '_id'
            })}

            {this.renderSelect({
              id: 'priority',
              label: 'Öncelik',
              name: 'priority',
              items: [
                { value: 0, label: 'Düşük' },
                { value: 1, label: 'Normal' },
                { value: 2, label: 'Yüksek' },
                { value: 3, label: 'Kritik' }
              ],
              labelKey: 'label',
              valueKey: 'value'
            })}
          </Grid>

          <Grid xs={12} spacing={16} justify="flex-end" item container>
            <Grid item>
              <Button color="primary" onClick={this.props.closeModal}>
                Vazgeç
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={this.handleFormSubmit}
                disabled={!this.state.explanation || this.state.isSaving}
                variant="outlined"
                color="primary"
              >
                Güncelle
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit
  }
})

EditIssueForm.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps({ units, categories, issues }) {
  return {
    units,
    categories,
    issues
  }
}

export default connect(
  mapStateToProps,
  { putIssue, fetchCategories, fetchUnits }
)(withStyles(styles)(withRouter(EditIssueForm)))
