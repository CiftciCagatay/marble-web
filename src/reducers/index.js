import { combineReducers } from 'redux'

// BPM
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
import ActivitiesReducer from './activities'
import CalendarReducer from './calendar'

// CRM
import CompanyReducer from './companies'
import ContactReducer from './contacts'
import SaleReducer from './sales'
import OfferReducer from './offers'
import ProductReducer from './products'

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
  accounts: AccountsReducer,
  activities: ActivitiesReducer,
  calendar: CalendarReducer,

  companies: CompanyReducer,
  contacts: ContactReducer,
  sales: SaleReducer,
  offers: OfferReducer,
  products: ProductReducer
})

export default rootReducer
