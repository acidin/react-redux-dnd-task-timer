import * as types from '../constants/ActionTypes'

function addItemOptimistic (text, id) {
  return { type: types.ADD_ITEM, text, id }
}

function editItemOptimistic (id, updatedText) {
  return { type: types.EDIT_ITEM, id, updatedText }
}

function deleteItemOptimistic (id) {
  return { type: types.DELETE_ITEM, id }
}

function showItem (id) {
  return { type: types.SHOW_ITEM, id }
}

function hideItem (id) {
  return { type: types.HIDE_ITEM, id }
}

function startTimer(id, offset) {
  return {type: types.START_TIMER, id, offset}
}

function stopTimer(id) {
  return {type: types.STOP_TIMER, id}
}

function resetTimer(id) {
  return {type: types.RESET_TIMER, id}
}

function tick(id, time) {
  return {type: types.TICK, id, time}
}

function updateItems(newstate) {
  return {type: types.UPDATE_ITEMS, newstate}
}

const getUniqueId = () => {

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();

};

export function addItem (text) {
  return dispatch => {
    const id = getUniqueId();
    dispatch(addItemOptimistic(text, id));
    setTimeout(() => dispatch(showItem(id)), 1)
  }
}

export function editItem (id, updatedText) {
  return dispatch => {
    dispatch(editItemOptimistic(id, updatedText))
  }
}

export function deleteItem (id) {
  return dispatch => {
    dispatch(hideItem(id));
    setTimeout(() => dispatch(deleteItemOptimistic(id)), 500)
  }
}

export function startTimerDispatch(id, offset) {
  return dispatch => dispatch(startTimer(id, offset))
}

export function stopTimerDispatch(id) {
  return dispatch => dispatch(stopTimer(id))
}

export function resetTimerDispatch(id) {
  return dispatch => dispatch(resetTimer(id))
}

export function tickDispatch(id, time) {
  return dispatch => dispatch(tick(id, time))
}

export function updateItemsDispatch(newstate) {
  return dispatch => dispatch(updateItems(newstate))
}

