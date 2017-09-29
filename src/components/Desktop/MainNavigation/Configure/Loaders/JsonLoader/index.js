import React from 'react'
import styles from '../common.css'

function JsonLoader () {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.info}>
        Import json files with the .json extension, transpiled to normal JavaScript
      </div>
    </div>
  )
}

export default JsonLoader
