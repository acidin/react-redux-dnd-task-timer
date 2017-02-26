import React from 'react'
import { render } from 'react-dom'
import IconPaths from '../icons/IconPaths.js'

require('../stylesheets/Icon.css')

export default ({ icon, size=16, paths=IconPaths }) => {
  const scale = size / 1024
  const transform = `scale(${scale} ${scale})`
  const className = `icon ${icon}`
  return (
    <svg className={className} width={size} height={size}>
      <g transform={transform}>
        { paths[icon].map((path, i) => <path key={i} d={path}></path>) }
      </g>
    </svg>
  )
}
