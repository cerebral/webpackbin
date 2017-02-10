import Inferno from 'inferno'
import styles from './styles.css'
import classNames from 'classnames'
import icons from 'common/icons.css'

function IconButton (props) {
  return (
    <button
      className={classNames(styles.button, props.className)}
      onClick={props.onClick}
      disabled={props.disabled}
      >
      {
        props.children ? (
          <div className={styles.iconTitleWrapper}>
            <div className={classNames({
              [styles.activeIcon]: props.active,
              [styles.notifyIcon]: props.notify,
              [styles.disabledIcon]: props.disabled,
              [styles.icon]: !props.active && !props.notify && !props.disabled
            })}>
              <div className={icons[props.icon]} />
            </div>
            <div className={styles.iconTitle}>
              {props.children}
            </div>
            {props.tooltip ? <i>{props.tooltip}</i> : null}
          </div>
        ) : (
          <div className={classNames({
            [styles.activeIcon]: props.active,
            [styles.notifyIcon]: props.notify,
            [styles.disabledIcon]: props.disabled,
            [styles.icon]: !props.active && !props.notify && !props.disabled
          })}>
            <div className={icons[props.icon]} />
            {props.tooltip ? <i>{props.tooltip}</i> : null}
          </div>
        )
      }
    </button>
  )
}

export default IconButton
