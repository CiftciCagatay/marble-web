import React from 'react'
import _ from 'lodash'
import { Add, InsertDriveFile as FileIcon, Close } from '@material-ui/icons'

const EventGrid = props => {
  const {
    events,
    selectedEventId,
    onSelectEvent,
    openFileDialog,
    removeEvent
  } = props

  const renderMedia = event => {
    const file = event.fileToUpload

    if (file.type.startsWith('image/')) {
      return <img src={file.preview} />
    } else {
      return <FileIcon style={{ marginTop: '24px' }} />
    }
  }

  const renderEventCard = (event, key) => {
    return (
      <div
        key={key}
        className="event-card"
        onClick={() => onSelectEvent(key)}
        style={{
          border: `${key === selectedEventId ? 4 : 1}px solid white`
        }}
      >
        <div className="event-card-remove" onClick={() => removeEvent(key)}>
          <Close />
        </div>
        {renderMedia(event)}
      </div>
    )
  }

  return (
    <div className="events-catalog">
      {_.map(events, (event, key) => renderEventCard(event, key))}

      <div className="add-file-card" onClick={openFileDialog}>
        <div style={{ marginTop: '16px' }}>
          <Add />
        </div>

        <div>Dosya Ekle</div>
      </div>
    </div>
  )
}

export default EventGrid
