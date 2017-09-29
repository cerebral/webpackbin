import React from 'react'
import styles from './styles.css'
import classNames from 'classnames'
import Icon from '../Icon'

function Avatar (props) {
  if (!props.imageUrl) {
    return (
      <Icon
        icon='user'
        className={props.className}
      />
    )
  }

  return (
    <div
      className={classNames(styles.avatar, props.className, {
        [styles[props.size]]: props.size,
        [styles.pointerCursor]: props.onClick
      })}
      onClick={props.onClick}
      style={{backgroundImage: `url(${props.imageUrl})`}}
    />
  )
}

export default Avatar
