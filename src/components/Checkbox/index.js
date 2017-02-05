import Inferno from 'inferno'
import styles from './styles.css'
import classnames from 'classnames'

function Checkbox (props) {
  return (
    <label
      className={classnames(styles.wrapper, {
        [styles.disabled]: props.disabled
      })}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type='checkbox'
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange}
      />
      <span>{props.children}</span>
    </label>
  )
}

export default Checkbox
