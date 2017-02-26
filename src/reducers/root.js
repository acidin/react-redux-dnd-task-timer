import { combineReducers } from 'redux'
import ItemReducer from './ItemReducer.js'

const rootReducer = combineReducers({
  items: ItemReducer,
  isOn: ItemReducer,
  time: ItemReducer
})

export default rootReducer
