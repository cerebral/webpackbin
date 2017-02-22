import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state} from 'cerebral/tags'
import Icon from 'common/components/Icon'
import styles from './styles.css'

export default connect({
  currentBinViewCount: state`app.stats.currentBinViewCount`,
  currentBinKey: state`app.currentBinKey`
},
  function Stats ({currentBinViewCount, currentBinKey}) {
    if (!currentBinKey) {
      return null
    }

    return (
      <div className={styles.wrapper}>
        <Icon icon='eye' />
        <strong>{currentBinViewCount}</strong> views
      </div>
    )
  }
)
