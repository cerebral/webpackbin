import Inferno from 'inferno'
import styles from './styles.css'

function Loader (props) {
  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.overlay} />
      <div className={styles.loaderWrapper}>
        <div className={styles.logo} />
        {props.children}
      </div>
    </div>
  )
}

export default Loader
