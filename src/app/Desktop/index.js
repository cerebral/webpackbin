import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state} from 'cerebral/tags'
import NavigationBar from 'components/NavigationBar'
import Snackbar from 'components/Snackbar'
import Bin from './Bin'
import styles from './styles.css'

export default connect({
  snackbar: state`app.snackbar`
},
  function Desktop ({snackbar}) {
    return (
      <div className={styles.wrapper}>
        <NavigationBar />
        <Bin />
        <Snackbar snackbar={snackbar} />
      </div>
    )
  }
)
