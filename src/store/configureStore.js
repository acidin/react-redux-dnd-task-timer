import { createStore, applyMiddleware,compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/root.js'
import persistState from 'redux-localstorage'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware
  ),
  persistState()
);


export default function configureStore (initialState) {
  return createStore(rootReducer, initialState, enhancer)
}

