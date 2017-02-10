import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import styles from './styles.css'
import Avatar from 'components/Avatar'

export default connect({

},
  function ProfileDisplay () {
    return (
      <div className={styles.wrapper}>
        <Avatar
          className={styles.avatar}
        />
        <div className={styles.name}>
          Anonymous
        </div>
      </div>
    )
  }
)
