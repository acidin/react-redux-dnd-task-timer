import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'underscore'
import * as ItemActions from '../actions/ListActions.js'
import IconButton from './IconButton.jsx'

require('../stylesheets/ListItemEditor.css')

class ListItemEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editedText: props.text }
    _.bindAll(this,
      'handleInputChange',
      'handleInputKeyUp',
      'handleEditSave',
      'handleEditCancel'
    )
  }
  render() {
    const { editedText } = this.state
    return (
      <div className="listItemEditor">
        <input ref="editInput"
          onChange={this.handleInputChange}
          onKeyUp={this.handleInputKeyUp}
          value={editedText} />
        <IconButton icon="save" text="Save" onClick={this.handleEditSave} />
        <IconButton icon="cancel" text="Cancel" onClick={this.handleEditCancel} />
      </div>
    )
  }
  componentDidMount() {
    this.refs.editInput.focus()
  }
  handleInputKeyUp(evt) {
    switch (evt.key) {
      case 'Enter':
        return this.handleEditSave()
      case 'Escape':
        return this.handleEditCancel()
    }
  }
  handleInputChange(evt) {
    const editedText = evt.target.value
    this.setState({ editedText: editedText })
  }
  handleEditSave() {
    const { itemId } = this.props
    const { editedText } = this.state
    this.props.editItem(itemId, editedText)
    this.props.onDoneEditing()
  }
  handleEditCancel() {
    this.props.onDoneEditing()
  }
}

function mapStateToProps (state) {
  return { }
}

function mapDispatchToProps (dispatch) {
  return {
    editItem: bindActionCreators(ItemActions.editItem, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemEditor)
