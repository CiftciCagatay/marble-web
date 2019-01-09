import React, { Component } from 'react'
import { TextField, Chip, Paper, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import keycode from 'keycode'
import Downshift from 'downshift'
import { connect } from 'react-redux'
import { getUserList } from '../../../actions'

class AssigneeInput extends Component {
  state = {
    inputValue: ''
  }

  componentDidUpdate(prevProps) {
    if (this.props.unit !== prevProps.unit && this.props.unit)
      this.props.getUserList({ unit: this.props.unit })
  }

  renderSuggestion = ({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  }) => {
    const isHighlighted = highlightedIndex === index
    const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1

    return (
      <MenuItem
        {...itemProps}
        key={suggestion._id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {suggestion.name}
      </MenuItem>
    )
  }

  getSuggestions = () => {
    if (!this.props.users) return []

    const inputValue = this.state.inputValue.toLowerCase()
    const inputLength = inputValue.length
    let count = 0

    return inputLength === 0
      ? this.props.users.filter(
          user => this.props.selectedAssignees.indexOf(user) === -1
        )
      : this.props.users.filter(user => {
          const keep =
            count < 5 &&
            this.props.selectedAssignees.indexOf(user) === -1 &&
            user.name.slice(0, inputLength).toLowerCase() === inputValue

          if (keep) {
            count += 1
          }

          return keep
        })
  }

  // Backspace e basıldığında eğer inputta bir değer yoksa sondaki seçili etiketi kaldır
  handleKeyDown = event => {
    const { inputValue } = this.state
    const { selectedAssignees, removeAssignee } = this.props

    if (
      selectedAssignees.length &&
      !inputValue.length &&
      keycode(event) === 'backspace'
    ) {
      removeAssignee(selectedAssignees.length - 1)
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleChange = assignee => {
    let { selectedAssignees, addAssignee } = this.props

    if (selectedAssignees.indexOf(assignee) === -1) {
      addAssignee(assignee)
    }

    this.setState({
      inputValue: ''
    })
  }

  handleDelete = index => () => {
    this.props.removeAssignee(index)
  }

  renderInput = inputProps => {
    const { InputProps, classes, ref, ...other } = inputProps

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot
          },
          ...InputProps
        }}
        {...other}
      />
    )
  }

  render() {
    const { inputValue } = this.state
    const { selectedAssignees, classes } = this.props

    return (
      <Downshift
        id="downshift-multiple-assignees"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedAssignees}
      >
        {({
          getItemProps,
          getInputProps,
          isOpen,
          highlightedIndex,
          selectedItem
        }) => (
          <div className={classes.container}>
            {this.renderInput({
              label: 'Görevliler',
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedAssignees.map((assignee, index) => (
                  <Chip
                    key={assignee._id}
                    tabIndex={-1}
                    label={assignee.name}
                    className={classes.chip}
                    onDelete={this.handleDelete(index)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: 'Görevi birilerine atayın'
              })
            })}

            {isOpen ? (
              <Paper className={classes.paper} square>
                {this.getSuggestions(inputValue).map((suggestion, index) =>
                  this.renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem: selectedItem
                  })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: 'wrap'
  },
  divider: {
    height: theme.spacing.unit * 2
  }
})

function mapStateToProps({ users: { users } }) {
  return { users }
}

export default connect(
  mapStateToProps,
  { getUserList }
)(withStyles(styles)(AssigneeInput))
