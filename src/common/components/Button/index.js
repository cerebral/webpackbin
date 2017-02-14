import Inferno from 'inferno'
import styles from './styles.css'

function Button (props) {
  return (
    <button
      disabled={props.disabled}
      className={styles.wrapper}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
