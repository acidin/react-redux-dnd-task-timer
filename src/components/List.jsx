import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import ListItem from './ListItem.jsx'

import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

require('../stylesheets/List.css')

//@DragDropContext(HTML5Backend)
export class List extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ...props
        };
        this.moveItem = this.moveItem.bind(this);
    }


    moveItem(dragIndex, hoverIndex) {
        const { items } = this.state;
        const dragItem = items[dragIndex];

        this.setState(update(this.state, {
            items: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragItem],
                ],
            },
        }));
    }


    render() {
    const { items } = this.props
    return (
      <ul className="list">
        {
          items.map(({ id, text, hidden },i) =>
            <ListItem key={id} itemId={id}
                      id={id}
                      text={text} hidden={hidden}
                      moveItem={this.moveItem} index={i}
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
  return { }
}

/*export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)*/

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(DragDropContext(HTML5Backend)(List))


/*export default DragDropContext(HTML5Backend)(connect(
    mapStateToProps,
    mapDispatchToProps
)(List));*/
