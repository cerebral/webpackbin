import Inferno from 'inferno'
import styles from './styles.css'

function Unsupported () {
  return (
    <div className={styles.wrapper}>
      This size is not supported, please flip phone or make browser wider
    </div>
  )
}

export default Unsupported
