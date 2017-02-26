import { combineReducers } from 'redux'
import ItemReducer from './ItemReducer.js'

const rootReducer = combineReducers({
  items: ItemReducer
})

export default rootReducer
