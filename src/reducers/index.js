import { combineReducers } from 'redux'

import IssuesReducer from './issues'
import IssueEventsReducer from './issueEvents'
import AuthReducer from './auth'
import UsersReducer from './users'
import LabelsReducer from './labels'
import UnitsReducer from './units'
import CategoriesReducer from './categories'
import ReportReducer from './report'
import NotificationReducer from './notifications'
import AccountsReducer from './accounts'

import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: AuthReducer,
  issues: IssuesReducer,
  issueEvents: IssueEventsReducer,
  form: formReducer,
  users: UsersReducer,
  labels: LabelsReducer,
  units: UnitsReducer,
  categories: CategoriesReducer,
  report: ReportReducer,
  notifications: NotificationReducer,
  accounts: AccountsReducer
})

export default rootReducer