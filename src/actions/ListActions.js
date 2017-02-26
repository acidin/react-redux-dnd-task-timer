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

let id = 3
const getUniqueId = () => {
  return id++;
}

export function addItem (text) {
  return dispatch => {
    const id = getUniqueId()
    dispatch(addItemOptimistic(text, id))
    setTimeout(() => dispatch(showItem(id)), 1)
    // api.addItem(text)
    //  .catch(
    //    /*
    //     *  PROJECT IDEA
    //     *  if the request failed due to server being unreachable,
    //     *  we can cache this action in localStorage to be called later
    //     *
    //     */
    //  )
  }
}

export function editItem (id, updatedText) {
  return dispatch => {
    dispatch(editItemOptimistic(id, updatedText))
  }
}

export function deleteItem (id) {
  return dispatch => {
    dispatch(hideItem(id))
    setTimeout(() => dispatch(deleteItemOptimistic(id)), 500)
  }
}
