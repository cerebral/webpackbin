import Inferno from 'inferno'
import styles from './styles.css'
import classnames from 'classnames'

function Snackbar (props) {
  const snackbar = props.snackbar || {text: '', type: 'noral'}

  return (
    <div className={classnames(styles.snackbar, {
      [styles.visible]: Boolean(snackbar.text),
      [styles.error]: snackbar.type === 'error'
    })}>
      {snackbar.text}
    </div>
  )
}

export default Snackbar
