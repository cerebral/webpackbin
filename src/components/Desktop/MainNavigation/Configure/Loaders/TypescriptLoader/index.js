import React from 'react';
import styles from '../common.css';

function RawLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.info}>
        Import typescript files with the .ts extension.
      </div>
    </div>
  );
}

export default RawLoader;
