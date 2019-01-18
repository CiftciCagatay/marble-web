import React from 'react'
import { Card, Chip, List, ListItem, ListItemText } from '@material-ui/core'
import Label from '../common/label'
import UserAvatar from '../common/user-avatar'
import { timeDiff, timeFormat } from '../../scripts'

const IssueDetailsCard = props => {
  const renderDetail = (title, detail) => {
    if (!detail) return null

    return (
      <ListItem>
        <ListItemText
          primary={title}
          secondary={detail}
          primaryTypographyProps={{
            color: 'textSecondary',
            variant: 'caption',
            gutterBottom: true
          }}
          secondaryTypographyProps={{
            color: 'textPrimary',
            variant: 'subheading'
          }}
        />
      </ListItem>
    )
  }

  const { issue } = props
  const priorities = [
    {
      text: 'Düşük',
      color: 'skyblue'
    },
    {
      text: 'Normal',
      color: 'green'
    },
    {
      text: 'Yüksek',
      color: 'orange'
    },
    {
      text: 'Kritik',
      color: 'red'
    }
  ]

  return (
    <Card>
      <List>
        <ListItem>
          <UserAvatar user={issue.createdBy} />
          <ListItemText
            primary={
              <span>
                <span>{issue.title}</span>
                <Chip
                  label={issue.isOpen ? 'Devam Ediyor' : 'Tamamlandı'}
                  color={issue.isOpen ? 'secondary' : 'primary'}
                  style={{ marginLeft: '4px' }}
                  variant="outlined"
                />
              </span>
            }
            secondary={timeDiff(issue.createdAt)}
          />
        </ListItem>

        {renderDetail('Açıklama', issue.explanation)}

        {renderDetail('Özet', issue.summary)}

        {renderDetail(
          'Teslim Tarihi',
          timeFormat(issue.deadline, 'DD/MM/YYYY')
        )}

        {issue.unit && renderDetail('Birim', issue.unit.name)}

        {renderDetail('Öncelik', <Label label={priorities[issue.priority]} />)}

        {issue.category && renderDetail('Kategori', issue.category.text)}

        {issue.subCategory &&
          renderDetail('Alt Kategori', issue.subCategory.text)}

        {issue.labels &&
          renderDetail(
            'Etiketler',
            issue.labels.map(label => <Label key={label._id} label={label} />)
          )}

        {issue.assignees &&
          renderDetail(
            'Görevliler',
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              {issue.assignees.map(user => (
                <UserAvatar user={user} />
              ))}
            </div>
          )}
      </List>
    </Card>
  )
}

export default IssueDetailsCard
