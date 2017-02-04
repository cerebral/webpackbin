import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import NavigationBar from 'components/NavigationBar'
import Bin from './Bin'
import styles from './styles.css'

export default connect({

},
  function Desktop () {
    return (
      <div className={styles.wrapper}>
        <NavigationBar />
        <Bin />
      </div>
    )
  }
)
