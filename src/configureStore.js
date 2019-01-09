import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers'
import thunk from 'redux-thunk'

export default () => {
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['issues','form']
  }
  
  const persistedReducer = persistReducer(persistConfig, reducers)

  const store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)

  return { store, persistor }
}
