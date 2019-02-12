import React, { Component } from 'react'

import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import configureStore from './configureStore'

import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { MuiThemeProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'

import {
  Home,
  Issues,
  KnowledgeBase,
  Login,
  IssueDetails,
  About,
  Units,
  Settings,
  Calendar,
  Files,
  Customers,
  Sales,
  Offers,
  OfferDetails,
  SaleDetails,
  Products,
  Contacts
} from './routes'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Navbar from './components/navbar/navbar'

export const { store, persistor } = configureStore()

const theme = createMuiTheme({
  palette: {
    primary: { main: '#00796B' },
    secondary: { main: '#00796B' },
    accent: { backgroundColor: red[500], color: '#FFF' }
  },
  themeName: 'Pine Green Turquoise Blue Yak',
  typography: {
    useNextVariants: true
  }
})

class App extends Component {
  mainRoute = () => (
    <Navbar>
      <div id="root" style={{ padding: '12px', paddingTop: '20px' }}>
        <Switch>
          <Route path="/issues/:id" component={IssueDetails} />
          <Route path="/issues" component={Issues} />
          <Route path="/knowledgeBase" component={KnowledgeBase} />
          <Route path="/home" component={Home} />
          <Route path="/units" component={Units} />
          <Route path="/about" component={About} />
          <Route path="/settings" component={Settings} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/files" component={Files} />
          <Route path="/customers" component={Customers} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/products" component={Products} />
          <Route path="/sales/:id" component={SaleDetails} />
          <Route path="/sales" component={Sales} />
          <Route path="/offers/:id" component={OfferDetails} />
          <Route path="/offers" component={Offers} />
        </Switch>
      </div>
    </Navbar>
  )

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <div>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
                <BrowserRouter>
                  <Switch>
                    <Route path="/(.+)" component={this.mainRoute} />
                    <Route path="/" component={Login} />
                  </Switch>
                </BrowserRouter>
              </div>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
