import React, { Fragment } from 'react'
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import UserAvatar from '../../common/user-avatar'
import { timeDiff } from '../../../scripts'

import offers from '../../../mocks/offers.json'

export default function(props) {
  return (
    <Fragment>
      <List>
        {offers.map(offer => (
          <ListItem key={offer._id} button>
            <ListItemAvatar>
              <UserAvatar user={offer.createdBy} />
            </ListItemAvatar>

            <ListItemText
              primary={offer.title}
              secondary={`${
                offer.status === 'created'
                  ? 'Oluşturuldu'
                  : offer.status === 'sent'
                  ? 'Yollandı'
                  : 'Tamamlandı'
              } - ${timeDiff(offer.createdAt)}`}
            />
          </ListItem>
        ))}
      </List>
    </Fragment>
  )
}
