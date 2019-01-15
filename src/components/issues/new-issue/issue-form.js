import React, { Component } from 'react'
import {
  Button,
  IconButton,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {
  Delete as DeleteIcon,
  AttachFile,
  InsertDriveFile as FileIcon
} from '@material-ui/icons'

import AssigneePopoverButton from './assignee-popover-button'
import LabelPopoverButton from './label-popover-button'
import FileDropzone from '../../common/fileDropzone'

import {
  fetchUnits,
  postIssue,
  postIssueEvent,
  fetchCategories
} from '../../../actions'
import { uploadImage } from '../../../api'
import { connect } from 'react-redux'
import _ from 'lodash'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  title: {
    padding: theme.spacing.unit
  },
  progress: {
    marginRight: theme.spacing.unit * 2
  }
})

class IssueForm extends Component {
  state = {
    explanation: '',
    assignees: {},
    labels: {},
    unit: '',
    priority: 0,
    files: [],
    submitting: false
  }

  dropzoneRef = null

  priorities = [
    { _id: 0, name: 'Düşük' },
    { _id: 1, name: 'Normal' },
    { _id: 2, name: 'Yüksek' },
    { _id: 3, name: 'Kritik' }
  ]

  componentDidMount() {
    this.props.fetchUnits().then(() => {
      const unit = Object.keys(this.props.units)[0]
      this.props.fetchCategories({ unit })
      this.setState({ unit })
    })
  }

  onSelectUser = user => {
    this.setState({
      assignees: {
        ...this.state.assignees,
        [user._id]: user
      }
    })
  }

  onDeselectUser = userId => {
    const { [userId]: _, ...assignees } = this.state.assignees

    this.setState({
      assignees
    })
  }

  onSelectLabel = label => {
    this.setState({
      labels: {
        ...this.state.labels,
        [label._id]: label
      }
    })
  }

  onDeselectLabel = labelId => {
    const { [labelId]: _, ...labels } = this.state.labels

    this.setState({
      labels
    })
  }

  onUnitChange = e => {
    let unit = e.target.value

    this.setState({
      unit,
      assignees: {},
      labels: {},
      category: '',
      subCategory: ''
    })

    this.props.fetchCategories({ unit })
  }

  handleChange = id => e => {
    this.setState({ [id]: e.target.value })
  }

  generateTitle = () => {
    if (this.state.explanation === '') return ''

    const words = this.state.explanation.split(' ')

    return words.reduce((prev, cur, curIndex) => {
      if (curIndex < 4) return `${prev} ${cur}`

      return prev
    })
  }

  setDropzoneRef = node => (this.dropzoneRef = node)

  onDrop = files => {
    this.setState({ files: [...this.state.files, ...files] })
  }

  refactorIssue = () => {
    let {
      files,

      title,
      unit,
      category,
      subCategory,
      assignees,
      labels,
      ...state
    } = this.state

    if (!title) title = this.generateTitle()

    unit = this.props.units[unit]

    if (category) {
      category = this.props.categories[category]

      if (subCategory && category.subCategories) {
        subCategory = category.subCategories.filter(
          ({ _id }) => _id === subCategory
        )[0]
      }
    }

    assignees = _.map(assignees)
    labels = _.map(labels)

    return {
      ...state,
      title,
      unit,
      category,
      subCategory,
      assignees,
      labels
    }
  }

  uploadFile = file => {
    if (!file) return Promise.resolve()

    const formData = new FormData()

    formData.append('uploads', file)

    return uploadImage(this.props.accessToken, formData).then(result => {
      let files = JSON.parse(result)
      return Promise.resolve(files[0])
    })
  }

  onSubmit = () => {
    this.setState({ submitting: true })

    const issue = this.refactorIssue()
    const { files } = this.state

    this.props
      .postIssue(issue)
      .then(({ _id: issueId }) => {
        let promises = []

        if (files.length !== 0) {
          // POST Event with first file
          promises.push(
            this.uploadFile(files[0]).then(file =>
              this.props.postIssueEvent({
                issueId,
                type: 'comment',
                comment: issue.explanation,
                file
              })
            )
          )

          // Then post other files
          files.slice(1).map(file =>
            promises.push(
              this.uploadFile(file).then(file =>
                this.props.postIssueEvent({
                  issueId,
                  type: 'comment',
                  file
                })
              )
            )
          )
        } else {
          // POST event
          promises.push(
            this.props.postIssueEvent({
              issueId,
              type: 'comment',
              comment: issue.explanation
            })
          )
        }

        if (issue.assignees.length > 0) {
          promises.push(
            this.props.postIssueEvent({
              issueId,
              type: 'assign',
              users: issue.assignees
            })
          )
        }

        if (issue.labels.length > 0) {
          promises.push(
            this.props.postIssueEvent({
              issueId,
              type: 'addLabel',
              labels: issue.labels
            })
          )
        }

        return Promise.all(promises)
      })
      .then(() => {
        this.setState({ submitting: false })
        this.props.handleClose()
      })
      .catch(error => console.log(error))
  }

  renderTextField = props => {
    return (
      <TextField
        className={this.props.classes.formControl}
        autoFocus
        margin="dense"
        fullWidth
        {...props}
        disabled={this.state.submitting}
      />
    )
  }

  renderSelect = ({ label, items, labelKey, ...props }) => {
    return (
      <FormControl className={this.props.classes.formControl} fullWidth>
        <InputLabel htmlFor="age-simple">{label}</InputLabel>
        <Select {...props} disabled={this.state.submitting}>
          <MenuItem value="" />

          {_.map(items, item => (
            <MenuItem value={item._id}>{item[labelKey]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  renderForm = () => {
    return (
      <div className={this.props.classes.container}>
        {this.renderTextField({
          label: 'Başlık',
          id: 'title',
          value: this.state.title,
          onChange: this.handleChange('title')
        })}

        {this.renderTextField({
          label: 'Açıklama',
          id: 'explanation',
          value: this.state.explanation,
          onChange: this.handleChange('explanation'),
          rows: 3,
          maxRows: 5,
          multiline: true
        })}

        {this.renderSelect({
          label: 'Birim',
          value: this.state.unit,
          onChange: this.onUnitChange,
          labelKey: 'name',
          items: this.props.units
        })}

        {this.renderSelect({
          label: 'Öncelik',
          value: this.state.priority,
          onChange: this.handleChange('priority'),
          labelKey: 'name',
          items: this.priorities
        })}

        {this.renderSelect({
          label: 'Kategori',
          value: this.state.category,
          onChange: this.handleChange('category'),
          labelKey: 'text',
          items: this.props.categories
        })}

        {this.renderSelect({
          label: 'Alt Kategori',
          value: this.state.subCategory,
          onChange: this.handleChange('subCategory'),
          labelKey: 'text',
          items: []
        })}
      </div>
    )
  }

  render() {
    const { classes, handleClose } = this.props

    return (
      <FileDropzone
        setDropzoneRef={this.setDropzoneRef}
        onDrop={this.onDrop}
        disableClick
      >
        <Grid spacing={32} container>
          <Grid xs={8} item>
            {this.renderForm()}
          </Grid>

          <Grid xs={4} item>
            <AssigneePopoverButton
              selectedUsers={this.state.assignees}
              onSelectUser={this.onSelectUser}
              onDeselectUser={this.onDeselectUser}
              unit={this.state.unit}
              disabled={this.state.submitting}
            />

            <Divider className={classes.divider} />

            <LabelPopoverButton
              selectedLabels={this.state.labels}
              onSelectLabel={this.onSelectLabel}
              onDeselectLabel={this.onDeselectLabel}
              unit={this.state.unit}
              disabled={this.state.submitting}
            />

            <Divider className={classes.divider} />

            <Button
              onClick={() => this.dropzoneRef.open()}
              size="small"
              disabled={this.state.submitting}
              fullWidth
            >
              <Grid justify="space-between" alignItems="center" container>
                <Grid xs item>
                  <Typography variant="button" align="left">
                    Ekler
                  </Typography>
                </Grid>

                <Grid item>
                  <AttachFile />
                </Grid>
              </Grid>
            </Button>

            <List dense disablePadding>
              {this.state.files.map((file, index) => (
                <ListItem dense disableGutters>
                  <ListItemAvatar>
                    <Avatar>
                      <FileIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText primary={file.name} />

                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        let files = [...this.state.files]
                        files.splice(index)
                        this.setState({ files })
                      }}
                      disabled={this.state.submitting}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid xs={12} spacing={16} item container justify="flex-end">
            <Grid item>
              <Button
                onClick={handleClose}
                color="primary"
                disabled={this.state.submitting}
              >
                Vazgeç
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.onSubmit}
                disabled={this.state.submitting}
              >
                {this.state.submitting && (
                  <CircularProgress size={16} className={classes.progress} />
                )}

                {this.state.submitting ? 'Oluşturuluyor' : 'Oluştur'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </FileDropzone>
    )
  }
}

function mapStateToProps({
  users: { users },
  units,
  categories,
  auth: { accessToken }
}) {
  return { users, units, categories, accessToken }
}

export default connect(
  mapStateToProps,
  { fetchUnits, postIssue, postIssueEvent, fetchCategories }
)(withStyles(styles)(IssueForm))
