import React from 'react'
import styles from './styles.css'

function NavigationBar (props) {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  )
}

export default NavigationBar
