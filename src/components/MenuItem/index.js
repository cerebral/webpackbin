import Inferno from 'inferno'
import styles from './styles.css'

function MenuItem (props) {
  return (
    <div
      className={styles.wrapper}
      onClick={props.onClick}
      >
      {props.children}
    </div>
  )
}

export default MenuItem
