import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App.jsx'
import configureStore from './store/configureStore'
import * as ItemActions from './actions/ListActions.js'

const initialState = {
  items: [
    { id: 0, text: 'Item' },
    { id: 1, text: 'Another item' },
    { id: 2, text: 'Something else' }
  ]
}

const store = configureStore(initialState)
const container = document.createElement('div')
container.className = 'container'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body.appendChild(container)
)
