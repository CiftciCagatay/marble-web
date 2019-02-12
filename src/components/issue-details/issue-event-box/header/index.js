import React from 'react'
import { IconButton } from '@material-ui/core'
import { AttachFile } from '@material-ui/icons'

import AssigneeButton from './buttons/assignee-button'
import LabelButton from './buttons/label-button'
import EditButton from './buttons/edit-button'
import ResolveButton from './buttons/resolve-button'
import DeleteButton from './buttons/delete-button'
import ShareButton from './buttons/share-button'
import ScheduleActivityButton from './buttons/schedule-activity-button'

const IssueDetailHeader = props => {
  const { issue } = props

  if (!issue) return null

  return (
    <div
      style={{
        backgroundColor: '#fff',
        position: 'relative'
      }}
    >
      <ScheduleActivityButton issueId={issue._id} />

      <AssigneeButton
        key="assignee-button"
        assignees={issue.assignees}
        isOpen={issue.isOpen}
        issueId={issue._id}
        unitId={issue.unit._id}
        unit={issue.unit._id}
      />

      <LabelButton
        selectedLabels={issue.labels}
        isOpen={issue.isOpen}
        issueId={issue._id}
        unitId={issue.unit._id}
        key="label-button"
        unit={issue.unit._id}
      />

      <ResolveButton
        isOpen={issue.isOpen}
        issueId={issue._id}
        unitId={issue.unit._id}
      />

      <DeleteButton issueId={issue._id} />

      <EditButton />
    </div>
  )
}

export default IssueDetailHeader
