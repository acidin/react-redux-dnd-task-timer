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

function startTimer (state, action) {
  return {
    ...state,
    isOn: true,
    time: state.time, // Begin time
    offset: action.offset
  }
}

function stopTimer (state, action) {
  return {
    ...state,
    isOn: false,
    time: state.time
  };
}

function tick (state, action) {
  return {
    ...state,
    time: state.time + (action.time - state.offset),
    offset: action.time
  };
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

    case types.START_TIMER:
      return startTimer(state, action)

    case types.STOP_TIMER:
      return stopTimer(state, action)

    case types.TICK:
      return tick(state, action)

    default:
      return state
  }
}
