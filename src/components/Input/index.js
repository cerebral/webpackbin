import Inferno from 'inferno'
import styles from './styles.css'
import icons from 'common/icons.css'

function Input (props) {
  return (
    <input
      value={props.value}
      onClick={props.onClick}
      onChange={props.onChange}
      className={styles.input}
      autoFocus={props.autoFocus}
      placeholder={props.placeholder}
      />
  )
}

export default Input
