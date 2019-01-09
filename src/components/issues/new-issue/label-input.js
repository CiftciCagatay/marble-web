import React, { Component } from 'react'
import { TextField, Chip, Paper, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import keycode from 'keycode'
import Downshift from 'downshift'
import { connect } from 'react-redux'
import { getLabelList } from '../../../actions'

class LabelInput extends Component {
  state = {
    inputValue: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.unit !== this.props.unit && this.props.unit)
      this.props.getLabelList({ unit: this.props.unit })
  }

  renderSuggestion = ({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  }) => {
    const isHighlighted = highlightedIndex === index
    const isSelected = (selectedItem || '').indexOf(suggestion.text) > -1

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.text}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {suggestion.text}
      </MenuItem>
    )
  }

  getSuggestions = () => {
    const inputValue = this.state.inputValue.toLowerCase()
    const inputLength = inputValue.length
    let count = 0

    return inputLength === 0
      ? this.props.labels.filter(
          label => this.props.selectedLabels.indexOf(label) === -1
        )
      : this.props.labels.filter(label => {
          const keep =
            count < 5 &&
            this.props.selectedLabels.indexOf(label) === -1 &&
            label.text.slice(0, inputLength).toLowerCase() === inputValue

          if (keep) {
            count += 1
          }

          return keep
        })
  }

  // Backspace e basıldığında eğer inputta bir değer yoksa sondaki seçili etiketi kaldır
  handleKeyDown = event => {
    const { inputValue } = this.state
    const { selectedLabels, removeLabel } = this.props

    if (
      selectedLabels.length &&
      !inputValue.length &&
      keycode(event) === 'backspace'
    ) {
      removeLabel(selectedLabels.length - 1)
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleChange = label => {
    let { selectedLabels, addLabel } = this.props

    if (selectedLabels.indexOf(label) === -1) {
      addLabel(label)
    }

    this.setState({
      inputValue: ''
    })
  }

  handleDelete = index => () => {
    this.props.removeLabel(index)
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
    const { selectedLabels, classes } = this.props

    return (
      <Downshift
        id="downshift-multiple-labels"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedLabels}
      >
        {({
          getItemProps,
          getMenuProps,
          getInputProps,
          isOpen,
          highlightedIndex,
          selectedItem
        }) => (
          <div className={classes.container}>
            {this.renderInput({
              label: 'Etiketler',
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedLabels.map((label, index) => (
                  <Chip
                    key={label._id}
                    tabIndex={-1}
                    label={label.text}
                    className={classes.chip}
                    onDelete={this.handleDelete(index)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: 'Göreve etiketler ekleyin'
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

function mapStateToProps({ labels }) {
  return { labels }
}

export default connect(
  mapStateToProps,
  { getLabelList }
)(withStyles(styles)(LabelInput))
