import React from 'react'
import styles from '../common.css'

function RawLoader () {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.info}>
        Import vue templates on files with the .vue extension
      </div>
    </div>
  )
}

export default RawLoader
