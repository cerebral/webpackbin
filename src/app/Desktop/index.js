import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import Snackbar from './Snackbar'
import Bin from './Bin'
import styles from './styles.css'

export default connect({
  clicked: signal`app.clicked`
},
  function Desktop ({snackbar, clicked}) {
    return (
      <div
        className={styles.wrapper}
        onClick={() => clicked()}
      >
        <Bin />
        <Snackbar />
      </div>
    )
  }
)
