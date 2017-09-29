import React from 'react'
import styles from './styles.css'
import classnames from 'classnames'

function Description (props) {
  return (
    <div className={classnames(styles.wrapper, {
      [styles.light]: props.light
    })}>
      {props.children}
    </div>
  )
}

export default Description
