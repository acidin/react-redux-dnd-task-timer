import React from 'react'
import { render } from 'react-dom'
import Icon from './Icon.jsx'

require('../stylesheets/IconButton.css')

export default class IconButton extends React.Component {
  render() {
    const { icon, text, onClick } = this.props
    const className = this.getClassName()
    return (
      <a className={className} title={text} onClick={onClick}>
        <Icon icon={icon} size="14" />
        <span className="iconButtonText">{text}</span>
      </a>
    )
  }
  getClassName() {
    const classes = ['iconButton']
    const { className } = this.props
    if (className) {
      classes.push(className)
    }
    return classes.join(' ')
  }
}
