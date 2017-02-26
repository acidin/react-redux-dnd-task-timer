import * as types from '../constants/ActionTypes.js'

function addItem (state, action) {
  return [
    { text: action.text, id: action.id, hidden: true },
    ...state
  ]
}

function editItem (state, action) {
  const next = JSON.parse(JSON.stringify(state))
  const index = next.findIndex((item) => {
    return item.id === action.id
  })
  next[index].text = action.updatedText
  return next
}

function deleteItem (state, action) {
  const next = JSON.parse(JSON.stringify(state))
  const index = next.findIndex((item) => {
    return item.id === action.id
  })
  next.splice(index, 1)
  return next
}

function showItem (state, action) {
  const next = JSON.parse(JSON.stringify(state))
  const index = next.findIndex((item) => {
    return item.id === action.id
  })
  next[index].hidden = false
  return next
}

function hideItem (state, action) {
  const next = JSON.parse(JSON.stringify(state))
  const index = next.findIndex((item) => {
    return item.id === action.id
  })
  next[index].hidden = true
  return next
}

export default function (state = [], action) {
  switch (action.type) {
    case types.ADD_ITEM:
      return addItem(state, action)

    case types.EDIT_ITEM:
      return editItem(state, action)

    case types.DELETE_ITEM:
      return deleteItem(state, action)

    case types.SHOW_ITEM:
      return showItem(state, action)

    case types.HIDE_ITEM:
      return hideItem(state, action)

    default:
      return state
  }
}
