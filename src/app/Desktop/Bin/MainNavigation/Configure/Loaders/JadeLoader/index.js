import Inferno from 'inferno'
import styles from '../common.css'

function JadeLoader () {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.info}>
        Import jade script files with the .jade extension, transpiled to normal JavaScript
      </div>
    </div>
  )
}

export default JadeLoader
