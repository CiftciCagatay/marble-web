import React, { Component } from 'react'
import {
  Dialog,
  Grid,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  IconButton,
  Typography
} from '@material-ui/core'

import { DateTimePicker } from 'material-ui-pickers'

import { getUsers } from '../../api'
import { createActivity, fetchIssues } from '../../actions'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Close } from '@material-ui/icons'

class ActivityFormDialog extends Component {
  state = {
    users: [],
    moreOptions: false,

    title: '',
    explanation: '',
    location: '',
    issueId: '',
    participants: [],
    allDay: false,
    start: new Date(),
    end: new Date(),

    canEdit: false,
    canInvite: true,
    canSeeParticipantList: true
  }

  componentDidMount() {
    const { accessToken } = this.props

    getUsers(accessToken, {})
      .then(response => response.json())
      .then(({ results }) =>
        this.setState({ users: _.mapKeys(results, '_id') })
      )

    this.props.fetchIssues({})
  }

  componentDidUpdate(prevProps) {
    const { mode, activity } = this.props

    if (prevProps.mode !== mode || prevProps.activity !== activity) {
      this.setState({ mode, ...activity })
    }
  }

  onSubmit = () => {
    let {
      dialogOpen,
      users,
      moreOptions,
      participants,
      ...activity
    } = this.state

    let { issueId } = this.props

    if (!issueId) issueId = activity.issueId

    if (participants.indexOf(this.props.user._id) < 0) {
      participants.push(this.props.user._id)
    }

    participants = participants.map(_id => {
      const { name } = users[_id]
      return { _id, name }
    })

    this.props
      .createActivity({ ...activity, participants, issueId })
      .then(() => this.props.onClose())
  }

  render() {
    const { open, onClose, mode } = this.props
    const { moreOptions } = this.state

    return (
      <Dialog
        key="dialog"
        open={open}
        onClose={onClose}
        maxWidth={moreOptions ? 'lg' : 'sm'}
        fullWidth
      >
        <DialogContent>
          <Grid spacing={16} container>
            <Grid xs item container spacing={8}>
              <Grid xs={12} item>
                <TextField
                  label="Başlık"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                  fullWidth
                />
              </Grid>

              {moreOptions && (
                <Grid xs={12} item>
                  <TextField
                    label="Açıklama"
                    value={this.state.explanation}
                    onChange={e =>
                      this.setState({ explanation: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>
              )}

              {moreOptions && (
                <Grid xs={12} item>
                  <TextField
                    label="Konum"
                    value={this.state.location}
                    onChange={e => this.setState({ location: e.target.value })}
                    fullWidth
                  />
                </Grid>
              )}

              <Grid xs={12} spacing={16} item container>
                <Grid xs={6} item>
                  <DateTimePicker
                    label="Başlangıç"
                    ampm={false}
                    cancelLabel="Vazgeç"
                    okLabel="Tamam"
                    value={this.state.start}
                    onChange={moment =>
                      this.setState({ start: moment.toDate() })
                    }
                    fullWidth
                  />
                </Grid>

                <Grid xs={6} item>
                  <DateTimePicker
                    label="Bitiş"
                    ampm={false}
                    cancelLabel="Vazgeç"
                    okLabel="Tamam"
                    value={this.state.end}
                    onChange={moment => this.setState({ end: moment.toDate() })}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid xs={12} item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.allDay}
                      onChange={e =>
                        this.setState({ allDay: e.target.checked })
                      }
                      value={this.state.allDay}
                      color="primary"
                    />
                  }
                  label="Tüm gün"
                />
              </Grid>
            </Grid>

            {moreOptions && (
              <Grid xs={6} item>
                <FormControl fullWidth>
                  <InputLabel htmlFor="tasks-native-select">
                    İlgili Görev
                  </InputLabel>

                  <Select
                    value={this.state.issueId}
                    onChange={e => this.setState({ issueId: e.target.value })}
                    inputProps={{
                      name: 'tasks',
                      id: 'tasks-native-select'
                    }}
                  >
                    {_.map(this.props.issues, issue => (
                      <MenuItem key={issue._id} value={issue._id}>
                        {issue.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="participants-native-select">
                    Katılımcılar
                  </InputLabel>
                  <Select
                    multiple
                    value={this.state.participants}
                    onChange={e =>
                      this.setState({ participants: e.target.value })
                    }
                    inputProps={{
                      name: 'participants',
                      id: 'participants-native-select'
                    }}
                  >
                    {_.map(this.state.users, user => (
                      <MenuItem key={user._id} value={user._id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography style={{ marginTop: '8px' }}>
                  Katılımcılar şunları yapabilir:
                </Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.canEdit}
                      onChange={e =>
                        this.setState({ canEdit: e.target.checked })
                      }
                      color="primary"
                    />
                  }
                  label="Düzenleyebilir"
                  fullWidth
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.canInvite}
                      onChange={e =>
                        this.setState({ canInvite: e.target.checked })
                      }
                      color="primary"
                    />
                  }
                  label="Davet Edebilir"
                  fullWidth
                />

                {/*
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.canSeeParticipantList}
                          onChange={e =>
                            this.setState({
                              canSeeParticipantList: e.target.checked
                            })
                          }
                          color="primary"
                        />
                      }
                      label="Katılımcıları Listeleyebilir"
                      fullWidth
                    />
                  */}
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            onClick={() => this.setState({ moreOptions: !moreOptions })}
          >
            {moreOptions ? 'Daha Az' : 'Diğer Seçenekler'}
          </Button>

          <Button variant="outlined" color="primary" onClick={this.onSubmit}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

function mapStateToProps({ auth: { accessToken }, issues, users: { user } }) {
  return { accessToken, issues, user }
}

export default connect(
  mapStateToProps,
  { createActivity, fetchIssues }
)(ActivityFormDialog)
