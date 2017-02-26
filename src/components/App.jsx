import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import AddItem from './AddItem.jsx'
import List from './List.jsx'
import Timer from './Timer.jsx'

require('../stylesheets/Reset.css')
require('../stylesheets/Colors.css')
require('../stylesheets/App.css')

export default class App extends React.Component {
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
