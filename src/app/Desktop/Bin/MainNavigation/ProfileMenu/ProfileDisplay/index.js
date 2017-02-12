import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state} from 'cerebral/tags'
import styles from './styles.css'
import Avatar from 'components/Avatar'

export default connect({
  user: state`app.user`
},
  function ProfileDisplay ({user}) {
    if (!user) {
      return null
    }

    return (
      <div className={styles.wrapper}>
        <Avatar
          imageUrl={user.isAnonymous ? null : user.providerData[0].photoURL}
          size='small'
          className={styles.avatar}
        />
        <div className={styles.name}>
          {user.isAnonymous ? 'Anonymous' : user.providerData[0].displayName}
        </div>
      </div>
    )
  }
)
