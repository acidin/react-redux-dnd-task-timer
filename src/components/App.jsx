import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import AddItem from './AddItem.jsx'
import List from './List.jsx'

require('../stylesheets/Reset.css')
require('../stylesheets/Colors.css')
require('../stylesheets/App.css')

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <AddItem />
        <List />
      </div>
    )
  }
}
