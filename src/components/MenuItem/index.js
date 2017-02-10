import Inferno from 'inferno'
import styles from './styles.css'
import icons from 'common/icons.css'

function MenuItem (props) {
  return (
    <div
      className={styles.wrapper}
      onClick={props.onClick}
      >
      <div className={icons[props.icon]} />
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
}

export default MenuItem
