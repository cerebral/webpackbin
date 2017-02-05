import Inferno from 'inferno'
import styles from './styles.css'

function Snackbar ({text}) {
  return (
    <div className={text ? styles.snackbarVisible : styles.snackbar}>
      {text}
    </div>
  )
}

export default Snackbar
