import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  TextField,
  Button,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Chip
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'

import LabelInput from './label-input'
import AssigneeInput from './assignee-input'
import FileDropzone from './file-dropzone'

import { CloudUpload, Send, Cancel } from '@material-ui/icons'

import { connect } from 'react-redux'
import {
  postIssue,
  fetchCategories,
  fetchUnits,
  getLabelList,
  getUserList,
  postIssueEvent
} from '../../../actions'
import { uploadImage } from '../../../api'
import { map, toArray } from 'lodash'

class NewIssueForm extends Component {
  INITIAL_STATE = {
    title: '',
    explanation: '',
    assignees: [],
    labels: [],
    unit: null,
    category: null,
    subCategory: null,
    isOpen: true,
    createdBy: this.props.user,
    subCategories: [],
    isSaving: false,
    files: [],
    priority: 0
  }

  dropzoneRef = null

  state = this.INITIAL_STATE

  componentDidMount() {
    this.props.fetchUnits().then(() => {
      if (this.props.units)
        this.setState({ unit: toArray(this.props.units)[0]._id })
    })
  }

  onUnitChange = unit => {
    this.props.fetchCategories({ unit })
    this.props.getLabelList({ unit })
    this.props.getUserList({ unit })
  }

  generateTitle = () => {
    if (this.state.explanation === '') return ''

    const words = this.state.explanation.split(' ')

    return words.reduce((prev, cur, curIndex) => {
      if (curIndex < 4) return `${prev} ${cur}`

      return prev
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()

    this.setState({ saving: true })

    let {
      title,
      explanation,
      labels,
      assignees,
      files,
      category,
      unit,
      subCategory,
      priority
    } = this.state

    if (!title) title = this.generateTitle()

    if (unit) {
      unit = this.props.units[unit]
    }

    if (subCategory) {
      subCategory = this.props.categories[category].subCategories.filter(
        ({ _id }) => _id === subCategory
      )[0]
    }

    if (category) {
      category = this.props.categories[category]
    }

    this.props
      .postIssue({
        title,
        explanation,
        labels,
        assignees,
        category,
        unit,
        subCategory,
        priority
      })
      .then(({ _id }) => {
        let promises = []

        promises.push(
          this.props.postIssueEvent({
            issueId: _id,
            type: 'comment',
            comment: explanation,
            files
          })
        )

        if (assignees.length > 0) {
          promises.push(
            this.props.postIssueEvent({
              issueId: _id,
              type: 'assign',
              users: assignees
            })
          )
        }

        if (labels.length > 0) {
          promises.push(
            this.props.postIssueEvent({
              issueId: _id,
              type: 'addLabel',
              labels: labels
            })
          )
        }

        return Promise.all(promises)
      })
      .then(() => {
        this.setState(this.INITIAL_STATE)
        this.props.closeModal()
      })
      .catch(error => console.log(error))
  }

  removeLabel = index =>
    this.setState({
      labels: this.state.labels.filter((_, i) => i !== index)
    })

  addLabel = label => this.setState({ labels: [...this.state.labels, label] })

  removeAssignee = index =>
    this.setState({
      assignees: this.state.assignees.filter((_, i) => i !== index)
    })

  addAssignee = assignee =>
    this.setState({ assignees: [...this.state.assignees, assignee] })

  setDropzoneRef = node => (this.dropzoneRef = node)

  openFileDialog = () => {
    if (this.dropzoneRef) this.dropzoneRef.open()
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({ dropzoneActive: false })

    const formData = new FormData()

    acceptedFiles.map(file => formData.append('uploads', file))

    uploadImage(this.props.accessToken, formData, e => {
      var percentage = (e.loaded / e.total) * 100
      console.log(percentage + '%')
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ files: [...this.state.files, ...result] })
      })
      .catch(err => console.log(err))
  }

  handleSelectChange = name => event => {
    this.setState({
      [name]: event.target.value
    })

    if (name === 'category') {
      this.setState({
        subCategories: this.props.categories[event.target.value].subCategories
      })
    }
  }

  renderFileList = () => this.state.files.map(image => <div>{image.name}</div>)

  render() {
    const { classes } = this.props

    return (
      <FileDropzone
        setDropzoneRef={this.setDropzoneRef}
        onDrop={this.onDrop}
        onDragEnter={() => this.setState({ dropzoneActive: true })}
        onDragLeave={() => this.setState({ dropzoneActive: false })}
        disableClick
      >
        {this.state.dropzoneActive && (
          <div className={classes.overlay}>
            <Typography variant="headline" color="default">
              Dosyaları buraya bırakın...
            </Typography>
          </div>
        )}

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
              value={this.state.unit ? this.state.unit : ''}
              onChange={event => {
                this.onUnitChange(event.target.value)
                this.setState({ unit: event.target.value })
              }}
              inputProps={{
                name: 'unit',
                id: 'unit-select'
              }}
              native
            >
              <option value="" />
              {map(this.props.units, unit => (
                <option key={unit._id} value={unit._id}>
                  {unit.name}
                </option>
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

          <div className={classes.formControl}>
            <LabelInput
              removeLabel={this.removeLabel}
              addLabel={this.addLabel}
              selectedLabels={this.state.labels}
              unit={this.state.unit}
            />
          </div>

          <div className={classes.formControl}>
            <AssigneeInput
              removeAssignee={this.removeAssignee}
              addAssignee={this.addAssignee}
              selectedAssignees={this.state.assignees}
              unit={this.state.unit}
            />
          </div>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="category-select">Kategori</InputLabel>
            <Select
              value={this.state.category ? this.state.category : ''}
              onChange={this.handleSelectChange('category')}
              inputProps={{
                name: 'category',
                id: 'category-select'
              }}
              native
            >
              <option value="" />
              {map(this.props.categories, category => (
                <option key={category._id} value={category._id}>
                  {category.text}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="subCategory-select">Alt Kategori</InputLabel>
            <Select
              value={this.state.subCategory ? this.state.subCategory : ''}
              onChange={event =>
                this.setState({ subCategory: event.target.value })
              }
              inputProps={{
                name: 'subCategory',
                id: 'subCategory-select'
              }}
              native
              disabled={this.state.subCategories.length === 0}
            >
              <option value="" />
              {this.state.subCategories.map(subCategory => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.text}
                </option>
              ))}
            </Select>
          </FormControl>

          <div>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
              style={{ float: 'left' }}
              onClick={this.handleFormSubmit}
              disabled={!this.state.explanation || this.state.isSaving}
            >
              <Send
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Gönder
            </Button>

            <Button
              variant="contained"
              size="small"
              color="default"
              className={classes.button}
              style={{ float: 'left' }}
              onClick={this.openFileDialog}
            >
              Dosya Yükle
              <CloudUpload
                className={classNames(classes.rightIcon, classes.iconSmall)}
              />
            </Button>

            <Button
              variant="contained"
              size="small"
              color="default"
              className={classes.button}
              style={{
                float: 'right',
                backgroundColor: red[500],
                color: '#fff'
              }}
              onClick={this.props.closeModal}
            >
              Vazgeç
              <Cancel
                className={classNames(classes.rightIcon, classes.iconSmall)}
              />
            </Button>
          </div>

          <div>
            {this.state.files.map((file, index) => (
              <Chip
                className={classes.chip}
                label={file.originalname}
                onDelete={() =>
                  this.setState({
                    files: this.state.files.filter((_, i) => i !== index)
                  })
                }
              />
            ))}
          </div>
        </form>
      </FileDropzone>
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
  },
  chip: {
    margin: theme.spacing.unit
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2.5em 0',
    background: 'rgba(239, 239, 239, 0.5)',
    border: '5px dashed grey'
  }
})

NewIssueForm.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps({
  units,
  categories,
  users: {
    user: { roles }
  },
  auth: { accessToken }
}) {
  return {
    units,
    categories,
    roles,
    accessToken
  }
}

export default connect(
  mapStateToProps,
  {
    postIssue,
    fetchCategories,
    fetchUnits,
    postIssueEvent,
    getLabelList,
    getUserList
  }
)(withStyles(styles)(NewIssueForm))
