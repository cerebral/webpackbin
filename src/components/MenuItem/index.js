import Inferno from 'inferno'
import styles from './styles.css'
import icons from 'common/icons.css'
import classnames from 'classnames'

function MenuItem (props) {
  return (
    <div
      className={classnames(styles.wrapper, {
        [styles.disabled]: props.disabled
      })}
      onClick={props.disabled ? null : props.onClick}
      >
      <div className={icons[props.icon]} />
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
}

export default MenuItem
