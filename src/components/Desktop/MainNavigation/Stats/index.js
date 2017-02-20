import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state} from 'cerebral/tags'
import Icon from 'common/components/Icon'
import styles from './styles.css'

export default connect({
  currentBinSeenCount: state`app.stats.currentBinSeenCount`
},
  function Stats ({currentBinSeenCount}) {
    return (
      <div className={styles.wrapper}>
        <Icon icon='eye' />
        Seen <strong>{currentBinSeenCount}</strong> {currentBinSeenCount === 1 ? 'time' : 'times'}
      </div>
    )
  }
)
