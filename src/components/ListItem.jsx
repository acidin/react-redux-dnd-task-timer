import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import _ from 'underscore'
import flow from 'lodash/flow'
import * as ItemActions from '../actions/ListActions.js'
import ListItemEditor from './ListItemEditor.jsx'
import IconButton from './IconButton.jsx'
import Timer from './Timer.jsx'

require('../stylesheets/ListItem.css')

class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }
    _.bindAll(this,
      'onDoneEditing',
      'handleStartEditing',
      'handleDelete'
    )
  }
  render() {
    const { text, itemId, isOn, time,  isDragging, connectDragSource, connectDropTarget } = this.props
      //console.log(this.props);
    const { isEditing } = this.state
    const className = this.getClassName()
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <li style={{opacity}} className={className}>
        { isEditing ?
          <ListItemEditor
            itemId={itemId}
            text={text}
            onDoneEditing={this.onDoneEditing} />
          :
          <div className="listItemContent">
            <span className="listItemText" onClick={this.handleStartEditing} title="Click to edit">{text}</span>
            <IconButton icon="trashCan" text="Delete" onClick={this.handleDelete} />
          </div>
        }
        <Timer itemId={itemId} isOn={isOn} time={time} />
      </li>
    ))
  }
  getClassName() {
    const classes = ['listItem']
    if (this.props.hidden) {
      classes.push(' hide')
    }
    return classes.join(' ')
  }
  handleStartEditing() {
    this.setState({ isEditing: true })
  }
  onDoneEditing() {
    this.setState({ isEditing: false })
  }
  handleDelete() {
    const { itemId } = this.props
    this.props.deleteItem(itemId)
  }
}

function mapStateToProps (state) {
  return { }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteItem: bindActionCreators(ItemActions.deleteItem, dispatch),
  }
}


/*export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem)*/


const cardSource = {

  beginDrag(props) {
    //console.log(props);
    return {
      index: props.index,
      card: props
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
  }
};

const cardTarget = {

  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    //console.log(props.itemId);
    //console.log(sourceListId);
    if ( props.listId === sourceListId ) {
      //console.log(dragIndex, hoverIndex);
      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  }
};

let ConnectedListItem =  connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem)


export default flow(
  DropTarget("LISTITEM", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("LISTITEM", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(ConnectedListItem);