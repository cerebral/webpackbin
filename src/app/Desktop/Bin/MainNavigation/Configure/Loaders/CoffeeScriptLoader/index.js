import Inferno from 'inferno'
import styles from '../common.css'

function CoffeeScriptLoader () {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.info}>
        Import coffee script files with the .coffee extension, transpiled to normal JavaScript
      </div>
    </div>
  )
}

export default CoffeeScriptLoader
