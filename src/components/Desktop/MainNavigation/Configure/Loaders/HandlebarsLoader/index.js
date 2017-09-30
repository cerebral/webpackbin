import React from 'react';
import styles from '../common.css';

function HandlebarsLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.info}>
        Import handlebars files with the .handlebars extension, transpiled to
        template functions
      </div>
    </div>
  );
}

export default HandlebarsLoader;
