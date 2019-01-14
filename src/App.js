import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import configureStore from './configureStore'
import { createMuiTheme } from '@material-ui/core/styles'
import { teal, green } from '@material-ui/core/colors'
import { MuiThemeProvider } from '@material-ui/core'

import { Route, Switch, BrowserRouter } from 'react-router-dom'
import {
  Home,
  Issues,
  KnowledgeBase,
  Login,
  IssueDetails,
  About,
  Units
} from './routes'
import Navbar from './components/navbar/navbar'

export const { store, persistor } = configureStore()

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: green
  }
})

class App extends Component {
  mainRoute = () => (
    <MuiThemeProvider theme={theme}>
      <Navbar>
        <div id="root">
          <Switch>
            <Route path="/issues/:id" component={IssueDetails} />
            <Route path="/issues" component={Issues} />
            <Route path="/knowledgeBase" component={KnowledgeBase} />
            <Route path="/home" component={Home} />
            <Route path="/units" component={Units} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </Navbar>
    </MuiThemeProvider>
  )

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
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
        </PersistGate>
      </Provider>
    )
  }
}

export default App
