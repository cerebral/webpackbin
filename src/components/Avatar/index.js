import Inferno from 'inferno'
import styles from './styles.css'
import classNames from 'classnames'

function Avatar (props) {
  return (
    <div
      className={classNames(styles.avatar, {
        [styles[props.size]]: props.size,
        [styles.pointerCursor]: props.onClick
      })}
      onClick={props.onClick}
      style={{backgroundImage: `url(${props.imageUrl})`}}
    />
  )
}

export default Avatar
