import Inferno from 'inferno'
import styles from '../common.css'

function RawLoader () {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.info}>
        Import typescript files with the .ts extension. The <strong>entry</strong> file still needs to be a .js file. All
        other files can be .ts or .tsx.
      </div>
    </div>
  )
}

export default RawLoader
