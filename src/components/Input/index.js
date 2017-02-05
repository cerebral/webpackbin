import Inferno from 'inferno'
import styles from './styles.css'

function Input (props) {
  return (
    <input
      id={props.id}
      value={props.value}
      onClick={props.onClick}
      onInput={props.onInput}
      onKeyDown={function (event) {
        if (props.onSubmit && event.keyCode === 13) {
          props.onSubmit()
        } else if (props.onCancel && event.keyCode === 27) {
          props.onCancel()
        }
      }}
      className={styles.input}
      autoFocus={props.autoFocus}
      placeholder={props.placeholder}
      />
  )
}

export default Input
