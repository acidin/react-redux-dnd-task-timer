import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ListItem from './ListItem.jsx'
import { DropTarget } from 'react-dnd';
import * as ItemActions from '../actions/ListActions.js'

require('../stylesheets/List.css')

export class List extends React.Component {

  moveCard = (dragIndex, hoverIndex) => {

    var tempList = Object.assign([], this.props.items);
    const dragCard = tempList[dragIndex];
    tempList.splice(dragIndex, 1);
    tempList.splice(hoverIndex, 0, dragCard);
    //this.props.dispatch({ type: 'update_cards', data: tempList });
    this.props.updateItems(tempList);

  }
  render() {
    const { items } = this.props
    return (
      <ul className="list">
        {
          items.map(({ id, text, hidden, isOn, time }) =>
            <ListItem key={id} itemId={id} text={text}
                      hidden={hidden} isOn={isOn} time={time}
                      moveCard={this.moveCard}
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

/*export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)*/


let connect_context = connect(mapStateToProps, mapDispatchToProps)(List)

export default DropTarget("ListItem", {}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))(connect_context);