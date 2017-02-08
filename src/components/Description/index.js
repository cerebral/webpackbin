import Inferno from 'inferno'
import styles from './styles.css'

function Description (props) {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  )
}

export default Description
