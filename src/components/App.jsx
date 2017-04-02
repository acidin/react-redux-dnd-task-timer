import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import AddItem from './AddItem.jsx'
import List from './List.jsx'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import '../stylesheets/Reset.css'
import '../stylesheets/Colors.css'
import '../stylesheets/App.css'

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const {items} = this.props;
    return (
      <div className="app">

        <AddItem />
        <List items={items} />
      </div>
    )
  }
}

export default (DragDropContext(HTML5Backend)(App));