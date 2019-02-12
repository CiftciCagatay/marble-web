import React, { Component } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Grid,
  Tooltip,
  Avatar,
  Typography
} from '@material-ui/core'

import { red, orange } from '@material-ui/core/colors'

import UserAvatar from '../common/user-avatar'
import InviteButton from './invite-button'

import {
  Place as LocationIcon,
  AccessAlarm as TimeIcon,
  Today as AllDayIcon,
  Edit as EditIcon,
  ArrowForward as ShowTaskDetailsIcon,
  Close as CloseIcon,
  NotInterested as NotAttendingIcon,
  Check as AttendingIcon,
  Timer as WaitingForResponseIcon,
  PeopleOutlined as ParticipantsIcon,
  DeleteForever as DeleteIcon
} from '@material-ui/icons'

import { timeFormat } from '../../scripts'
import _ from 'lodash'
import { updateAttendingStatusForActivity, removeActivity } from '../../actions'
import { connect } from 'react-redux'

class ActivityDetailsDialog extends Component {
  renderDetail = ({ tooltip, icon, primary, secondary }) => {
    if (!primary) return null

    return (
      <ListItem>
        <ListItemAvatar>
          <Tooltip title={tooltip}>
            <Avatar>{icon}</Avatar>
          </Tooltip>
        </ListItemAvatar>

        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    )
  }

  renderAttendingStatusIcon = participant => {
    if (participant.waitingForResponse) {
      return (
        <Tooltip title="Yanıt Bekleniyor">
          <WaitingForResponseIcon style={{ color: orange[500] }} />
        </Tooltip>
      )
    } else if (participant.attending) {
      return (
        <Tooltip title="Katılacak">
          <AttendingIcon color="primary" />
        </Tooltip>
      )
    } else {
      return (
        <Tooltip title="Katılmayacak">
          <NotAttendingIcon style={{ color: red[500] }} />
        </Tooltip>
      )
    }
  }

  render() {
    const {
      open,
      onClose,
      activity,
      pushTaskDetails,
      removeActivity
    } = this.props

    if (!activity || !open) return null

    const currentUser = activity.participants[this.props.user._id]

    const isOwner = activity.createdBy._id === currentUser._id

    const canEdit = isOwner || activity.canEdit
    const canInvite = isOwner || activity.canInvite
    const canDelete = isOwner

    return (
      <Dialog open={open} onClose={onClose} minWidth="md" fullWidth>
        <DialogTitle>
          <Grid alignItems="center" container>
            <Grid xs item>
              <Typography variant="h5">{activity.title}</Typography>
            </Grid>

            <Grid item>
              {/*
                canEdit && (
                <Tooltip title="Düzenle">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )
              */}

              {canInvite && (
                <InviteButton
                  activityId={activity._id}
                  selectedUsers={Object.keys(activity.participants)}
                  onAddParticipants={onClose}
                />
              )}

              {canDelete && (
                <Tooltip
                  onClick={() => {
                    removeActivity(activity._id)
                    onClose()
                  }}
                  title="Etkinliği Sil"
                >
                  <IconButton color="primary">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Görev Detayları">
                <IconButton
                  onClick={pushTaskDetails}
                  color="primary"
                  disabled={!activity.issueId}
                >
                  <ShowTaskDetailsIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Kapat">
                <IconButton onClick={onClose} color="primary">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <List disableGutters dense>
            {this.renderDetail({
              tooltip: 'Lokasyon',
              icon: <LocationIcon />,
              primary: activity.location,
              secondary: 'Lokasyon'
            })}

            <ListItem dense>
              <ListItemAvatar>
                <Avatar>
                  <ParticipantsIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary="Davetliler" />
            </ListItem>

            <ListItem dense>
              <ListItemText
                primary={_.map(activity.participants, participant => (
                  <ListItem dense>
                    <ListItemAvatar>
                      <UserAvatar user={participant} small />
                    </ListItemAvatar>

                    <ListItemText
                      primary={participant.name}
                      secondary={
                        participant._id === activity.createdBy._id
                          ? 'Düzenleyen'
                          : ''
                      }
                    />

                    <ListItemSecondaryAction>
                      {this.renderAttendingStatusIcon(participant)}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              />
            </ListItem>

            {this.renderDetail({
              tooltip: 'Başlangıç',
              icon: <TimeIcon />,
              primary: timeFormat(activity.start, 'DD/MM/YYYY HH:mm'),
              secondary: 'Başlangıç'
            })}
            {this.renderDetail({
              tooltip: 'Bitiş',
              icon: <TimeIcon />,
              primary: timeFormat(activity.end, 'DD/MM/YYYY HH:mm'),
              secondary: 'Bitiş'
            })}
            {this.renderDetail({
              tooltip: 'Tüm Gün',
              icon: <AllDayIcon />,
              primary: activity.allDay ? 'Evet' : 'Hayır',
              secondary: 'Tüm Gün'
            })}
          </List>
        </DialogContent>

        <DialogActions>
          <Typography>Katılıyor musunuz?</Typography>

          <Button
            color="primary"
            onClick={() =>
              this.props.updateAttendingStatusForActivity(activity._id, false)
            }
            disabled={!currentUser.waitingForResponse && !currentUser.attending}
          >
            Hayır
          </Button>

          <Button
            color="primary"
            variant="outlined"
            onClick={() =>
              this.props.updateAttendingStatusForActivity(activity._id, true)
            }
            disabled={!currentUser.waitingForResponse && currentUser.attending}
          >
            Evet
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

function mapStateToProps({ users: { user } }) {
  return { user }
}

export default connect(
  mapStateToProps,
  { updateAttendingStatusForActivity, removeActivity }
)(ActivityDetailsDialog)
