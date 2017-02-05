import Inferno from 'inferno'
import styles from './styles.css'
import classnames from 'classnames'

function FileTab ({children, active, isEntry, onClick, onRemoveClick}) {
  return (
    <div
      onClick={onClick}
      className={classnames(styles.wrapper, {
        [styles.active]: Boolean(active)
      })}
    >
      {children}
      {isEntry ? <span className={styles.entry}>entry</span> : null}
      {onRemoveClick ? (
        <i
          onClick={onRemoveClick}
          className={styles.deleteFile}
        >
          x
        </i>
      ) : null}
    </div>
  )
}

export default FileTab
