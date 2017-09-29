import React from 'react'
import styles from '../common.css'

function RawLoader () {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.info}>
        Import html files with the .html extension as strings
      </div>
    </div>
  )
}

export default RawLoader
