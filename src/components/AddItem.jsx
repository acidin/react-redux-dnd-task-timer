import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'underscore'
import * as ItemActions from '../actions/ListActions.js'
import IconButton from './IconButton.jsx'

require('../stylesheets/AddItem.css')

class AddItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { itemText: '' }
    _.bindAll(this,
      'handleInputChange',
      'handleInputKeyUp',
      'handleAddItem'
    );
  }
  render() {
    const { itemText } = this.state
    return (
      <div className="addItem">
        <input ref="itemInput"
          className="addItemInput"
          onChange={this.handleInputChange}
          onKeyUp={this.handleInputKeyUp}
          value={itemText}
          placeholder="Add an item" />
        <IconButton className="addItemButton" icon="plus" text="Add" onClick={this.handleAddItem} />
      </div>
    )
  }
  handleInputKeyUp(evt) {
    switch (evt.key) {
      case 'Enter':
        return this.handleAddItem()
      case 'Escape':
        return this.resetItemInput()
    }
  }
  handleInputChange(evt) {
    const itemText = evt.target.value
    this.setState({ itemText: itemText })
  }
  handleAddItem() {
    const { itemText } = this.state
    if (itemText) {
      this.props.addItem(itemText)
      this.resetItemInput()
    }
  }
  resetItemInput() {
    const { itemInput } = this.refs
    this.setState({ itemText: '' })
    itemInput.focus()
  }
}

function mapStateToProps (state) {
  return { }
}

function mapDispatchToProps (dispatch) {
  return {
    addItem: bindActionCreators(ItemActions.addItem, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItem)
