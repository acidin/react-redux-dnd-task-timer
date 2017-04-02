import * as types from '../constants/ActionTypes.js'

function addItem (state, action) {
  return [
    { text: action.text, id: action.id, hidden: true, isOn: false, time: 0, offset: 0 },
    ...state
  ]
}

function editItem (state, action) {
  const next = JSON.parse(JSON.stringify(state));
  const index = next.findIndex((item) => {
    return item.id === action.id
  });
  next[index].text = action.updatedText;
  return next
}

function deleteItem (state, action) {
  const next = JSON.parse(JSON.stringify(state));
  const index = next.findIndex((item) => {
    return item.id === action.id
  });
  next.splice(index, 1);
  return next
}

function showItem (state, action) {
  const next = JSON.parse(JSON.stringify(state));
  const index = next.findIndex((item) => {
    return item.id === action.id
  });
  next[index].hidden = false;
  return next
}

function hideItem (state, action) {
  const next = JSON.parse(JSON.stringify(state));
  const index = next.findIndex((item) => {
    return item.id === action.id
  });
  next[index].hidden = true;
  return next
}


function startTimer (state, action) {

  const next = JSON.parse(JSON.stringify(state));

  const index = next.findIndex((item) => {
    return item.id === action.id
  });

  next[index].offset = action.offset;

  next[index].isOn = true;

  return next

}

function stopTimer (state, action) {

  const next = JSON.parse(JSON.stringify(state));

  const index = next.findIndex((item) => {
    return item.id === action.id
  });

  const checkStarted = next.filter((item,i) => {
    if ((item.isOn) && (i !== index)) return true;
  });

  if (checkStarted.length == 0) {
    next[index].isOn = false;
    return next
  } else {
    next[index].isOn = true;
    return next
  }

}

function tick (state, action) {

  const next = JSON.parse(JSON.stringify(state));
  const index = next.findIndex((item) => {
    return item.id === action.id
  });

  next[index].time = next[index].time + (action.time - next[index].offset);
  next[index].offset = action.time;
  return next

}

function resetTimer (state, action) {

  const next = JSON.parse(JSON.stringify(state));
  const index = next.findIndex((item) => {
    return item.id === action.id
  });
  next[index].isOn = false;
  next[index].time = 0;
  return next

}

function updateItems(state, action) {
 return [
    ...action.newstate
  ]
}

export default function (state = [], action) {
  switch (action.type) {
    case types.ADD_ITEM:
      return addItem(state, action);

    case types.EDIT_ITEM:
      return editItem(state, action);

    case types.DELETE_ITEM:
      return deleteItem(state, action);

    case types.SHOW_ITEM:
      return showItem(state, action);

    case types.HIDE_ITEM:
      return hideItem(state, action);

    case types.START_TIMER:
      return startTimer(state, action);

    case types.STOP_TIMER:
      return stopTimer(state, action);

    case types.RESET_TIMER:
      return resetTimer(state, action);

    case types.TICK:
      return tick(state, action);

    case types.UPDATE_ITEMS:
      return updateItems(state, action);

    default:
      return state
  }
}
