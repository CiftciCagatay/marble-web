import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import configureStore from './configureStore'

import { Route, Switch, BrowserRouter } from 'react-router-dom'
import {
  Home,
  Issues,
  KnowledgeBase,
  Dashboard,
  Login,
  IssueDetails,
  About
} from './routes'
import Navbar from './components/navbar/navbar'

const { store, persistor } = configureStore()

class App extends Component {
  mainRoute = () => (
    <Navbar>
      <div id="root">
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/issues/:id" component={IssueDetails} />
          <Route path="/issues" component={Issues} />
          <Route path="/knowledgeBase" component={KnowledgeBase} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Navbar>
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
