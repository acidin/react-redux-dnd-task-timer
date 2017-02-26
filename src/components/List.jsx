import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import ListItem from './ListItem.jsx'

require('../stylesheets/List.css')

export class List extends React.Component {
  render() {
    const { items } = this.props
    return (
      <ul className="list">
        {
          items.map(({ id, text, hidden, isOn, time }) =>
            <ListItem key={id} itemId={id} text={text} hidden={hidden} isOn={isOn} time={time} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)