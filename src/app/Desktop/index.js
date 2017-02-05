import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state} from 'cerebral/tags'
import NavigationBar from 'components/NavigationBar'
import Snackbar from 'components/Snackbar'
import Bin from './Bin'
import styles from './styles.css'

export default connect({
  snackbarText: state`app.snackbarText`
},
  function Desktop ({snackbarText}) {
    return (
      <div className={styles.wrapper}>
        <NavigationBar />
        <Bin />
        <Snackbar text={snackbarText} />
      </div>
    )
  }
)
