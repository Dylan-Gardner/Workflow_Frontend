import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


export default function configureStore() {

  const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  let store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
  );

  let persistor = persistStore(store);

  return {store, persistor}
}
