import Inferno from 'inferno'
import styles from '../common.css'

function PugLoader () {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.info}>
        Import pug script files with the .pug extension, transpiled to normal JavaScript
      </div>
    </div>
  )
}

export default PugLoader
