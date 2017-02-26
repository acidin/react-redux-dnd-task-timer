import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import AddItem from './AddItem.jsx'
import List from './List.jsx'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

require('../stylesheets/Reset.css')
require('../stylesheets/Colors.css')
require('../stylesheets/App.css')

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
  //  const {isOn, time} = this.props;
    return (
      <div className="app">

        <AddItem />
        <List />
      </div>
    )
  }
}

export default (DragDropContext(HTML5Backend)(App));