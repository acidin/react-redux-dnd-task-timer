import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ListItem from './ListItem.jsx'
import { DropTarget } from 'react-dnd'
import * as ItemActions from '../actions/ListActions.js'

import '../stylesheets/List.css'

export class List extends React.Component {

  moveCard = (dragIndex, hoverIndex) => {

    var tempList = Object.assign([], this.props.items);
    const dragCard = tempList[dragIndex];
    tempList.splice(dragIndex, 1);
    tempList.splice(hoverIndex, 0, dragCard);
    this.props.updateItems(tempList);

  };

  render() {
    const { items, connectDropTarget } = this.props;

    const itemStarted = items.find(item => item.isOn === true);

    return connectDropTarget(
      <ul className="list">
        {
          items.map(({ id, text, hidden, isOn, time },index) =>
            <ListItem key={id} itemId={id} text={text}
                      hidden={hidden} isOn={isOn} time={time}
                      index={index}
                      moveCard={this.moveCard}
                      checkStarted={itemStarted}
            />
          )
        }
      </ul>
    )
  }
}

function mapStateToProps (state) {
  return {
    items: state.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateItems: bindActionCreators(ItemActions.updateItemsDispatch, dispatch)
  }
}


let connect_context = connect(mapStateToProps, mapDispatchToProps)(List)

export default DropTarget("LISTITEM", {}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))(connect_context);