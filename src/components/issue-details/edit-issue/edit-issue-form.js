import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putIssue, fetchCategories, fetchUnits } from '../../../actions'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { map } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import {
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core'
import { Update, Cancel } from '@material-ui/icons'

class EditIssueForm extends Component {
  state = {
    title: '',
    explanation: '',
    priority: 0,
    category: null,
    subCategory: null,
    unit: null,
    subCategories: []
  }

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchUnits()

    const { id } = this.props.match.params
    const {
      _id,
      title,
      explanation,
      category,
      subCategory,
      unit,
      priority
    } = this.props.issues[id]

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
      priority
    })
  }

  handleFormSubmit = () => {
    const {
      _id,
      title,
      explanation,
      category,
      subCategory,
      unit,
      priority
    } = this.state

    this.props
      .putIssue(_id, { title, explanation, category, subCategory, unit, priority })
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

  render() {
    const { classes } = this.props

    return (
      <form
        className={classes.container}
        onSubmit={event => event.preventDefault()}
      >
        <div className={classes.formControl}>
          <TextField
            id="title"
            label="Başlık"
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
            fullWidth
            helperText="Başlık girilmezse otomatik olarak atanacak"
          />
        </div>

        <div className={classes.formControl}>
          <TextField
            id="explanation"
            label="Açıklama"
            value={this.state.explanation}
            onChange={event =>
              this.setState({ explanation: event.target.value })
            }
            fullWidth
            multiline
            rows="5"
          />
        </div>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="unit-select">Birim</InputLabel>
          <Select
            value={this.state.unit ? this.state.unit._id : ''}
            onChange={this.handleUnitChange}
            inputProps={{
              name: 'unit',
              id: 'unit-select'
            }}
            native
          >
            <option value="" />
            {map(this.props.units, unit => (
              <option value={unit._id}>{unit.name}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="category-select">Kategori</InputLabel>
          <Select
            value={this.state.category ? this.state.category._id : ''}
            onChange={this.handleCategoryChange}
            inputProps={{
              name: 'category',
              id: 'category-select'
            }}
            native
          >
            <option value="" />
            {map(this.props.categories, category => (
              <option value={category._id}>{category.text}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="subCategory-select">Alt Kategori</InputLabel>
          <Select
            value={this.state.subCategory ? this.state.subCategory._id : ''}
            onChange={this.handleSubCategoryChange}
            inputProps={{
              name: 'subCategory',
              id: 'subCategory-select'
            }}
            native
            disabled={this.state.subCategories.length === 0}
          >
            <option value="" />
            {this.state.subCategories.map(subCategory => (
              <option value={subCategory._id}>{subCategory.text}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="priority-select">Öncelik</InputLabel>
          <Select
            value={this.state.priority}
            onChange={e => this.setState({ priority: e.target.value })}
            inputProps={{
              name: 'priority',
              id: 'priority-select'
            }}
            native
          >
            <option value="0">Düşük</option>
            <option value="1">Normal</option>
            <option value="2">Yüksek</option>
            <option value="3">Kritik</option>
          </Select>
        </FormControl>

        <div>
          <Button
            variant="contained"
            size="small"
            className={classes.button}
            color="primary"
            style={{
              float: 'left'
            }}
            onClick={this.handleFormSubmit}
            disabled={!this.state.explanation || this.state.isSaving}
          >
            <Update
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Güncelle
          </Button>

          <Button
            variant="contained"
            size="small"
            className={classes.button}
            style={{
              float: 'right'
            }}
            color="secondary"
            onClick={this.props.closeModal}
          >
            Vazgeç
            <Cancel
              className={classNames(classes.rightIcon, classes.iconSmall)}
            />
          </Button>
        </div>
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
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
})

EditIssueForm.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps({
  units,
  categories,
  users: {
    user: { roles }
  },
  auth: { accessToken },
  issues
}) {
  return {
    units,
    categories,
    roles,
    issues,
    accessToken
  }
}

export default connect(
  mapStateToProps,
  { putIssue, fetchCategories, fetchUnits }
)(withStyles(styles)(withRouter(EditIssueForm)))
